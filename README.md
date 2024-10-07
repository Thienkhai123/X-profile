This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## HƯỚNG DẪN DEPLOY SOURCE

- Chạy câu lệnh yarn build (generate ra thư mục .next)
- Chạy câu lệnh yarn start để test (trong yarn start đã config chạy node server.js)
- Nén toàn bộ source lại (trừ thư mục .git và out nếu có) bỏ vào thư mục trên iis server
  P/S: Nếu không có cài thêm thư viện thì không cần đem thư mục node-modules vào cũng được

## HƯỚNG DẪN EXPORT STATIC (không khuyến khích đối với dynamic route ->> vd: post/[id])

- Chạy câu lệnh yarn prod (generate ra thư mục out)
- Copy thư mục out bỏ vào thư mục trên iis server
  P/S: Nếu muốn sử dụng export phải generate toàn bộ static path bằng "getStaticPaths"
  ->> để tạo ra 1 bunch [...ids].html (vd: 1.html, 2.html, 3.html...)
  Tài liệu hướng dẫn: https://nextjs.org/docs/basic-features/data-fetching/get-static-paths
