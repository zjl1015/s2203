console.log("hello module");
console.log(import.meta);
console.log(new URL(import.meta.url).searchParams.get('name'));