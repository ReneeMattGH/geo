"""WebSocket broadcaster for market data.

Broadcasts real-time market updates to connected WebSocket clients
every 2-5 seconds with real data from all providers.
"""
from __future__ import annotations

import asyncio
from datetime import datetime, UTC
from typing import Optional, Dict, Any

from app.core.logging import get_logger
from app.core.websocket import get_ws_manager
from app.services.market import get_unified_market_service

logger = get_logger(__name__)


class MarketDataBroadcaster:
    """Broadcasts market data updates via WebSocket.
    
    Runs a background task that:
    - Fetches market data every update_interval seconds
    - Broadcasts updates to all connected WebSocket clients
    - Handles errors gracefully without crashing
    """
    
    def __init__(self, update_interval: float = 3.0) -> None:
        """Initialize the broadcaster.
        
        Args:
            update_interval: Seconds between broadcasts (default 3.0)
        """
        self.update_interval = update_interval
        self.market_service = get_unified_market_service()
        self.ws_manager = get_ws_manager()
        
        self._broadcast_task: Optional[asyncio.Task] = None
        self._running = False
        self._last_broadcast: Optional[datetime] = None
    
    async def start(self) -> None:
        """Start the broadcast loop."""
        if self._running:
            logger.warning("MarketDataBroadcaster already running")
            return
        
        self._running = True
        self._broadcast_task = asyncio.create_task(
            self._broadcast_loop(),
            name="market_ws_broadcaster"
        )
        logger.info(
            "market_broadcaster_started",
            interval=self.update_interval
        )
    
    async def stop(self) -> None:
        """Stop the broadcast loop."""
        self._running = False
        
        if self._broadcast_task and not self._broadcast_task.done():
            self._broadcast_task.cancel()
            try:
                await self._broadcast_task
            except asyncio.CancelledError:
                pass
        
        logger.info("market_broadcaster_stopped")
    
    async def _broadcast_loop(self) -> None:
        """Main broadcast loop."""
        while self._running:
            try:
                await self._broadcast_once()
                await asyncio.sleep(self.update_interval)
            except asyncio.CancelledError:
                break
            except Exception as e:
                logger.error(f"Error in broadcast loop: {e}")
                await asyncio.sleep(self.update_interval)
    
    async def _broadcast_once(self) -> None:
        """Fetch and broadcast market data once."""
        try:
            # Fetch all market data
            market_data = await self.market_service.get_all_markets()
            
            # Prepare broadcast message
            message = {
                "type": "market_update",
                "timestamp": int(datetime.now(UTC).timestamp() * 1000),
                "data": market_data.get("data", {}),
                "count": market_data.get("count", 0)
            }
            
            # Broadcast to all market channel subscribers
            await self.ws_manager.broadcast("market", message)
            
            self._last_broadcast = datetime.now(UTC)
            logger.debug(
                "market_data_broadcast",
                count=message["count"],
                assets=list(message["data"].keys()) if message["data"] else []
            )
            
        except Exception as e:
            logger.error(f"Error broadcasting market data: {e}")
            # Send error status to clients
            await self.ws_manager.broadcast("market", {
                "type": "market_update",
                "timestamp": int(datetime.now(UTC).timestamp() * 1000),
                "status": "error",
                "message": str(e)
            })
    
    def get_status(self) -> Dict[str, Any]:
        """Get broadcaster status."""
        return {
            "running": self._running,
            "interval": self.update_interval,
            "last_broadcast": self._last_broadcast.isoformat() if self._last_broadcast else None
        }


# Singleton factory
_broadcaster: Optional[MarketDataBroadcaster] = None


def get_market_broadcaster() -> MarketDataBroadcaster:
    """Get MarketDataBroadcaster singleton."""
    global _broadcaster
    if _broadcaster is None:
        _broadcaster = MarketDataBroadcaster(update_interval=3.0)
    return _broadcaster


async def start_market_broadcasting() -> None:
    """Convenience function to start market broadcasting."""
    broadcaster = get_market_broadcaster()
    await broadcaster.start()


async def stop_market_broadcasting() -> None:
    """Convenience function to stop market broadcasting."""
    broadcaster = get_market_broadcaster()
    await broadcaster.stop()
