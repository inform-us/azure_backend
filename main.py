import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app_title = "api"
allowedOrigins = ["http://localhost:5173"]

app = FastAPI(title=app_title)
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowedOrigins,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/api/data")
async def get_data():
    return {"message": 'data received'}


if __name__ == "__main__":
    # This allows the FastAPI app to be run locally for development
    uvicorn.run("main:app", port=5702, reload=True)