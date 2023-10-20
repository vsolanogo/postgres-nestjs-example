
1. To run the app in docker run `docker-compose build` and `docker-compose up`
2. Check out the application at `http://localhost:3000/notes`
3. To run tests with docker db image execute `docker-compose -f docker-compose.development.yml up` and `npm run test:e2e` when it is ready.

If you encounter issues while running my Docker images, try using the following command to clean up. You can use a single command to prune all types of resources at once:
`docker system prune -af`
