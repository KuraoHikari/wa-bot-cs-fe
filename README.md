# Table of Content WA Bot CS FE

<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

- [WA Bot CS FE](#wa-bot-cs-fe)
  - [Installation](#installation)
  - [Prerequisites](#prerequisites)
    - [Clone the repository](#clone-the-repository)
    - [Install dependencies](#install-dependencies)
    - [Set up environment variables:](#set-up-environment-variables)
    - [Run the application](#run-the-application)
  - [Deployment](#deployment)
  - [Dependencies](#dependencies)
  - [Acknowledgements](#acknowledgements)
  - [Contributing](#contributing)
  - [Authors](#authors)
  - [License](#license)

<!-- TOC end -->

<!-- TOC --><a name="wa-bot-cs-fe"></a>

# WA Bot CS FE

This project is a Web App designed to help manage small stores efficiently. It's built using Node.js, React, and various modern libraries and frameworks to deliver a robust and user-friendly experience.

<!-- TOC --><a name="installation"></a>

## Installation

To get this project up and running on your local environment, follow these steps:

<!-- TOC --><a name="prerequisites"></a>

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js (v18 or higher)**: The project is built with Node.js. You must have Node.js version 18 or higher installed on your machine. You can download it from [Node.js official website](https://nodejs.org/).
- **npm (Node Package Manager)**: npm is used to install dependencies. It comes with Node.js, so if you have Node.js installed, you should have npm as well.
- **Git**: While not strictly necessary, the project recommends using Git for version control. If you plan to clone the repository, make sure Git is installed on your system. You can download it from [Git's official website](https://git-scm.com/).
- **Basic knowledge of terminal or command line usage**: Since the installation and running of the project require using the terminal or command line, basic knowledge in this area will be beneficial.

Once you have these prerequisites, you can proceed with the installation instructions below.

<!-- TOC --><a name="clone-the-repository"></a>

### Clone the repository

```bash
git clone git@github.com:KuraoHikari/wa-bot-cs-fe.git
cd wa-bot-cs-fe
```

<!-- TOC --><a name="install-dependencies"></a>

### Install dependencies

```bash
npm install
# or
yarn install
```

<!-- TOC --><a name="set-up-environment-variables"></a>

### Set up environment variables:

Create a `.env` file in the root directory and fill it with necessary environment variables:

```
VITE_APP_BASE_URL=http://localhost:3000
```

<!-- TOC --><a name="run-the-application"></a>

### Run the application

```bash
npm run dev
# or
yarn dev
```

This will start the Vite development server, and you should be able to access the app on `http://localhost:5173`.

<!-- TOC --><a name="deployment"></a>

## Deployment

The project has been deployed and can be accessed at the following URL:

- **[FE-WA-Bot-CS-FE](https://wabotaiv2.netlify.app)**.

<!-- TOC --><a name="dependencies"></a>

## Dependencies

This project uses several key technologies and libraries:

- **[Node.js](https://nodejs.org/en/)**: JavaScript runtime.
- **[Vite](https://vitejs.dev/)**: Front-end build tool.
- **[React](https://reactjs.org/)**: Library for building user interfaces.
- **[Shadcn UI](https://shadcn.github.io/)**: UI framework.
- **[KyJS](https://github.com/sindresorhus/ky)**: HTTP client.
- **[TanStack React Query](https://tanstack.com/query/v4)**: For server state management.

- **[Zod](https://github.com/colinhacks/zod)**: Data validation.
- **[TailwindCSS](https://tailwindcss.com/)**: Utility-first CSS framework.
- **[React Hook Form](https://react-hook-form.com/)**: Forms management.

<!-- TOC --><a name="acknowledgements"></a>

## Acknowledgements

Big thanks to everyone who has contributed to the open-source projects used in this application. Special thanks to:

- The React community for continuous support and innovative solutions.
- Contributors of Vite for their blazing fast build tool.

<!-- TOC --><a name="contributing"></a>

## Contributing

Contributions to the Warung Management App are welcome! If you have suggestions for improvements or bug fixes, please feel free to:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/AmazingFeature).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some AmazingFeature').
5. Push to the branch (git push origin feature/AmazingFeature).
6. Open a pull request.

<!-- TOC --><a name="authors"></a>

## Authors

- **Kurao Hikari** - _Initial work_ - [KuraoHikari](https://github.com/KuraoHikari)

<!-- TOC --><a name="license"></a>

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
