import { serverHttp } from "./app";

serverHttp
  .listen(
    4000, 
    () => console.log('🔥 Server started at http://localhost:4000')
  );