# Web3 Wallet Dashboard

A modern, responsive landing page with MetaMask wallet integration that displays Ethereum (ETH) and USDT balances on Ethereum Mainnet.

## Features

- ✅ **MetaMask Wallet Integration** - Connect and disconnect wallet seamlessly
- ✅ **Balance Display** - View ETH and USDT balances in real-time
- ✅ **Responsive Design** - Works perfectly on desktop and mobile devices
- ✅ **Error Handling** - Graceful error handling for edge cases
- ✅ **Auto-refresh** - Balances update automatically every 30 seconds
- ✅ **Modern UI** - Clean, user-friendly interface with Tailwind CSS

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **ethers.js** - Web3 library for Ethereum interactions

## Project Structure

```
src/
├── components/          # React components
│   ├── ConnectWallet.tsx
│   ├── BalanceDisplay.tsx
│   └── LandingPage.tsx
├── hooks/              # Custom React hooks
│   ├── useWallet.ts
│   └── useBalances.ts
├── utils/              # Utility functions
│   ├── constants.ts
│   └── ethers.ts
├── types/              # TypeScript type definitions
│   └── wallet.ts
├── App.tsx
└── main.tsx
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (or npm/yarn)
- MetaMask browser extension

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Deployment

The application can be deployed to any static hosting service. Here are some popular options:

### Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts

Or connect your GitHub repository to Vercel for automatic deployments.

### Netlify

1. Install Netlify CLI: `npm i -g netlify-cli`
2. Build the project: `pnpm build`
3. Deploy: `netlify deploy --prod --dir=dist`

### GitHub Pages

1. Build the project: `pnpm build`
2. Configure GitHub Pages to serve from the `dist` directory
3. Update `vite.config.ts` with the correct `base` path if needed

### Other Options

- **Cloudflare Pages** - Connect GitHub repo for automatic deployments
- **AWS S3 + CloudFront** - Upload `dist` folder to S3 bucket
- **Firebase Hosting** - Use Firebase CLI to deploy

## Usage

1. Make sure MetaMask is installed in your browser
2. Open the application
3. Click "Connect Wallet" button
4. Approve the connection in MetaMask
5. View your ETH and USDT balances

## Important Notes

- The application connects to **Ethereum Mainnet** only
- Ensure you're connected to Ethereum Mainnet in MetaMask
- USDT balance is fetched from the official USDT contract address on Ethereum Mainnet

## Development

### Code Structure

The project follows a modular architecture:

- **Components** - Reusable UI components
- **Hooks** - Custom React hooks for wallet and balance management
- **Utils** - Helper functions and constants
- **Types** - TypeScript type definitions

### Key Files

- `src/hooks/useWallet.ts` - Manages wallet connection state
- `src/hooks/useBalances.ts` - Fetches and manages token balances
- `src/utils/ethers.ts` - Web3 utility functions
- `src/components/LandingPage.tsx` - Main page component

## License

MIT
