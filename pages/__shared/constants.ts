// Desc: Constants for the app

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/server` || 'http://localhost/server';

export { BASE_URL };
console.log('BASE_URL', BASE_URL);
console.log('BASE_URL', BASE_URL);
console.log("process.env.GOOGLE_CLIENT_ID", process.env.GOOGLE_CLIENT_ID);
console.log("process.env.GOOGLE_CLIENT_SECRET", process.env.GOOGLE_CLIENT_SECRET);
console.log("NEXTAUTH_SECRET", process.env.NEXTAUTH_SECRET);