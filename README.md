# MD2PDF

A simple, open-source web application that converts Markdown to PDF. Privacy-first with no data storage.

## Features

- Live Markdown preview
- File upload support
- Direct PDF conversion via browser's print dialog
- Dark mode interface
- Supports standard Markdown syntax including tables, code blocks, and more
- No data is stored - all processing happens in your browser

## Demo

You can try the live demo at https://serhatkildaci.github.io/md2pdf (coming soon)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/serhatkildaci/md2pdf.git
cd md2pdf
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The app will be available at http://localhost:5173/

### Building for Production

```bash
npm run build
```

This will generate a `dist` directory with production-ready files.

## Technologies Used

- React with TypeScript
- Vite for development and building
- marked.js for Markdown to HTML conversion
- GitHub Markdown CSS for styling

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## Acknowledgements

- Inspired by [realdennis/md2pdf](https://github.com/realdennis/md2pdf)
- Uses [marked](https://github.com/markedjs/marked) for markdown parsing
- Uses [github-markdown-css](https://github.com/sindresorhus/github-markdown-css) for styling
