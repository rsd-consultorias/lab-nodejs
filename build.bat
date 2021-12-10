cls

cd ./banco-core
npm audit fix && npm i && npm run build && npm test && cd ../banco-api && npm audit fix && npm i && npm run build && npx tsoa spec && npm run swagger-autogen && cd ../front-end && npm audit fix && npm i && npm run build && npx ng serve | node ../banco-api/build/index.js
