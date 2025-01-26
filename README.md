# AWS S3 Enhanced File Manager

This project is an advanced file manager built using **Next.js**, offering enhanced features and usability compared to the default AWS S3 console. The application allows you to easily manage files stored in your S3 buckets, providing an intuitive interface and additional functionalities to streamline your workflow.

## Features

- **File Upload & Download**: Effortlessly upload and download files to and from your S3 buckets.
- **File Previews**: Preview files (images, videos, and documents) directly within the application.
- **Folder Management**: Create, rename, and delete folders for better organization.
- **Advanced Search**: Quickly find files or folders using robust search functionality.
- **Metadata Display**: View detailed file metadata, including size, type, last modified date, and more.
- **Permission Control**: Easily manage public/private file access and permissions.
- **Responsive Design**: Fully responsive UI for seamless use on desktop and mobile devices.
- **Secure Keys Management**: Your AWS credentials are securely used to interact with the S3 API.

## Getting Started

### Prerequisites

To run this project, you need the following:

1. **Node.js**: Install the latest version of Node.js from [https://nodejs.org/](https://nodejs.org/).
2. **AWS S3 Access Keys**:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`

You can generate these keys from your AWS Management Console under **IAM**.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/abhins0554/MyDriveProject.git
   ```

2. Navigate to the project directory:

   ```bash
   cd aws-s3-file-manager
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the root directory and add your AWS credentials:

   ```env
   AWS_ACCESS_KEY_ID=your-access-key-id
   AWS_SECRET_ACCESS_KEY=your-secret-access-key
   AWS_REGION=your-s3-region
   BUCKET_NAME=your-s3-bucket-name
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open your browser and visit `http://localhost:3000` to access the application.

## Deployment

To deploy this project, use any Next.js-compatible hosting platform like Vercel, AWS Amplify, or Netlify. If deploying to Vercel, simply connect your GitHub repository, and Vercel will handle the deployment.

Ensure to set the necessary environment variables in your hosting platform's dashboard.

## Keywords for SEO

- AWS S3 file manager
- Enhanced S3 console
- Next.js file manager
- S3 bucket management
- File manager for AWS S3
- Upload files to S3
- S3 folder management
- S3 file preview tool
- Secure S3 file access
- AWS S3 with Next.js

## Credits

This project was heavily inspired by and leverages concepts from Vercel's project **[v0.dev](https://v0.dev)**. Many thanks to their team for providing valuable insights and resources that contributed to the development of this project.

## Contributing

Contributions are welcome! If you'd like to contribute, please:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

Enjoy managing your AWS S3 files effortlessly with this enhanced file manager!

