# BlackPodPlug

A culturally-focused podcast aggregator and discovery platform specifically for Black and African American podcasters.

## Project Structure

```
blackpodplug/
├── frontend/          # Next.js React frontend
├── backend/           # FastAPI Python backend
├── docker-compose.yml # Database services
└── CLAUDE.md         # Development guidance
```

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- Docker and Docker Compose

### Setup

1. **Clone and setup environment**:
   ```bash
   git clone <your-repo>
   cd BlackPodPlug
   cp .env.example .env
   cp frontend/.env.local.example frontend/.env.local
   ```

2. **Start database services**:
   ```bash
   docker-compose up -d
   ```

3. **Setup backend**:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   
   # Initialize database (creates tables and seeds initial data)
   python init_db.py
   
   # Start the API server
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

4. **Setup frontend** (in a new terminal):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Accessing the Application

After completing the setup steps above:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs (FastAPI auto-generated docs)
- **PostgreSQL**: localhost:5432 (credentials in `.env`)
- **Redis**: localhost:6379

### Verifying Installation

1. **Check database services**:
   ```bash
   docker-compose ps
   ```
   Both `blackpodplug_postgres` and `blackpodplug_redis` should be running.

2. **Test backend API**:
   ```bash
   curl http://localhost:8000/health/
   ```
   Should return: `{"status":"healthy","service":"BlackPodPlug API"}`

3. **Test frontend**:
   Visit http://localhost:3000 - you should see the BlackPodPlug homepage with mock podcast data.

### Troubleshooting

- **Port already in use**: Change ports in `docker-compose.yml` or stop conflicting services
- **Database connection errors**: Ensure Docker services are running with `docker-compose ps`
- **Frontend build errors**: Delete `node_modules` and `package-lock.json`, then run `npm install` again
- **Python import errors**: Ensure virtual environment is activated and dependencies are installed

## Development Commands

### Backend
- `uvicorn app.main:app --reload` - Start development server
- `python -m pytest` - Run tests (when implemented)

### Frontend  
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

### Database
- `docker-compose up -d` - Start PostgreSQL and Redis
- `docker-compose down` - Stop services

## API Endpoints

- `GET /` - API status
- `GET /health` - Health check
- `GET /api/v1/health` - Detailed health check
- `GET /api/v1/podcasts` - List podcasts
- `GET /api/v1/podcasts/{id}` - Get specific podcast
- `POST /api/v1/podcasts` - Create podcast from RSS URL
- `GET /api/v1/podcasts/search` - Search podcasts
- `POST /api/v1/podcasts/aggregate` - Trigger podcast aggregation from external sources

## Features to Implement

See `CLAUDE.md` for detailed implementation guidance and `BusinessPlan.md` for full feature specifications.

## Current Status

✅ Project structure and configuration  
✅ Database models and API routes skeleton  
⏳ Frontend components and pages  
⏳ Podcast aggregation services  
⏳ Search functionality  
⏳ User authentication