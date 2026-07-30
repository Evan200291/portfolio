# Ent Hmue Maung - 3D Portfolio

A responsive, multi-page portfolio based on Ent Hmue Maung's CV. It combines an interactive Three.js network visualization with an Express REST API and MongoDB persistence.

## Pages

- Home: interactive 3D network scene, expertise, and featured work
- Projects: API-powered project archive with category filters
- Project detail: a clean URL and dedicated case-study view for every project
- About: work history, education, skills, and languages
- Contact: validated API form with MongoDB storage

## Technology stack

- Frontend: semantic HTML5, modern CSS, vanilla JavaScript, Three.js
- Backend: Node.js, Express, Helmet, CORS, compression, Morgan
- Database: MongoDB with Mongoose
- Deployment: Render/Heroku/AWS-compatible Node service; Netlify static option

## Local installation

Requirements: Node.js 18+ and, for persistent storage, MongoDB 6+ or a MongoDB Atlas connection string.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file:

   ```bash
   copy .env.example .env
   ```

3. Update `MONGODB_URI` in `.env`. For MongoDB Atlas, use the connection string provided by the Atlas dashboard.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:33221`.

### Run with PM2 on a server

After cloning the repository and installing dependencies, start the production service on port `33221`:

```bash
PORT=33221 NODE_ENV=production pm2 start server.js --name ent-portfolio
pm2 save
pm2 startup
```

Check the service with `pm2 status`, view logs with `pm2 logs ent-portfolio`, and verify `http://YOUR_SERVER_IP:33221/api/health`.

### Add your profile photo

Place a portrait at `public/assets/profile.jpg`. The hero automatically displays it over the included placeholder. A vertical 4:5 image at 1200 x 1500 pixels or larger is recommended.

### Add verified recommendations

The About page includes three ready-to-edit recommendation cards. In `public/about.html`, replace each placeholder blockquote and referee role/organization label only after the former senior network engineer or supervisor has approved the wording.

If `MONGODB_URI` is omitted or MongoDB is unavailable, the site still runs with bundled project data and temporary in-memory contact messages. Configure MongoDB before production deployment so contact submissions persist.

## API

- `GET /api/health` - server and database status
- `GET /api/projects` - all projects
- `GET /api/projects/:slug` - one project
- `POST /api/contact` - validate and save a contact message

Example contact payload:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Infrastructure role",
  "message": "I would like to discuss a network engineering opportunity."
}
```

## Deployment

### Render + MongoDB Atlas (recommended)

1. Push this repository to GitHub.
2. Create a free MongoDB Atlas cluster, database user, and connection string.
3. In Render, choose **New > Blueprint** and select the repository. `render.yaml` configures the service.
4. Add `MONGODB_URI` as a secret environment variable.
5. Set `ALLOWED_ORIGINS` to the public Render URL.
6. Deploy and verify `/api/health` reports `database: connected`.

### Heroku

1. Create a Heroku app and connect the GitHub repository.
2. Add `MONGODB_URI`, `NODE_ENV=production`, and `ALLOWED_ORIGINS` under Config Vars.
3. Deploy the main branch. Heroku uses the `start` script automatically.

### AWS

The included `Dockerfile` works with AWS App Runner or ECS.

1. Build and push the image to Amazon ECR.
2. Create an App Runner service from that image and expose port `33221`.
3. Add `MONGODB_URI`, `NODE_ENV=production`, and `ALLOWED_ORIGINS` as runtime environment variables.
4. Point a custom domain to the App Runner service and enable managed TLS.

### Netlify frontend option

The `public` folder can be deployed as a static site, and `netlify.toml` preserves the clean page routes. Because the project and contact pages call `/api`, deploy the Express backend separately (for example, Render) and either proxy `/api/*` to it with an additional Netlify redirect or change the frontend fetch base URL. A single Render/Heroku/AWS deployment is simpler because Express serves both frontend and API.

## Production checklist

- Use MongoDB Atlas instead of fallback mode.
- Set `ALLOWED_ORIGINS` to the exact public URL.
- Add rate limiting and CAPTCHA if the contact form receives abuse.
- Replace the included CV PDF whenever the source CV changes.
- Test keyboard navigation, reduced-motion mode, mobile navigation, and the contact API.

## Project structure

```text
.
|-- data/                 CV-derived project records
|-- models/               Mongoose schemas
|-- public/               Multi-page frontend and CV download
|   |-- css/
|   |-- js/
|   `-- assets/
|-- routes/               REST endpoints
|-- services/             Data access and automatic database seed
|-- server.js             Express application
|-- Dockerfile
|-- render.yaml
`-- netlify.toml
```
