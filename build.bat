cls

echo "################# 1 - Build e Teste do CORE #############"
cd ./banco-core
rm -rf ./build
npm audit fix
npm i
npm run build
npm test

echo "################# 2 - Build da API ######################"
cd ../banco-api
rm -rf ./build
npm audit fix
npm i
npm run build
npx tsoa spec
npm run swagger-autogen

echo "################# 3 - Build do front-end ################"
cd ../front-end
rm -rf ./dist
npm audit fix
npm i
npm run build

echo "################# 4 - Rodar serviços ####################"
ng serve | node ../banco-api/build/index.js
