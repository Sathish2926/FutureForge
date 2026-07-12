from fastapi import Request


async def logging_middleware(request: Request, call_next):
    return await call_next(request)
