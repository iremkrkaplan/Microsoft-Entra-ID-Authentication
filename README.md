# Microsoft Entra External ID Authentication

A modern React application demonstrating authentication with Microsoft Entra External ID (CIAM) using the Microsoft Authentication Library (MSAL). This application provides a complete authentication flow with sign-in, sign-out, and protected profile page functionality.

## Features

- Microsoft Entra External ID (CIAM) authentication integration
- React-based user interface with modern design
- Protected routes and profile management
- Session management with automatic token refresh
- Azure Static Web Apps deployment ready

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- Microsoft Entra External ID tenant
- Registered application in Azure Portal

## Installation

1. Clone the repository:
```bash
git clone https://github.com/iremkrkaplan/Microsoft-Entra-ID-Authentication.git
cd Microsoft-Entra-ID-Authentication
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
VITE_TENANT_DOMAIN=your-tenant-domain
VITE_USER_FLOW=your-user-flow-name
VITE_CLIENT_ID=your-client-id
VITE_REDIRECT_URI=http://localhost:3000
```

## Configuration

### Azure Portal Setup

1. Navigate to Microsoft Entra External ID in Azure Portal
2. Create a new user flow or use an existing one
3. Register a new application and note the Client ID
4. Configure redirect URIs for your application
5. Set up optional claims for user profile information (given name, surname, email)

### Environment Variables

- `VITE_TENANT_DOMAIN`: Your Azure tenant domain (e.g., `contoso`)
- `VITE_USER_FLOW`: The name of your user flow (e.g., `B2C_1_signup_signin`)
- `VITE_CLIENT_ID`: The application (client) ID from Azure Portal
- `VITE_REDIRECT_URI`: The redirect URI after authentication (default: `http://localhost:3000`)

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Building for Production

Build the application for production:
```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Deployment

This application is configured for deployment to Azure Static Web Apps. The `staticwebapp.config.json` file contains the necessary configuration for routing and fallback behavior.

### Azure Static Web Apps Deployment

1. Connect your GitHub repository to Azure Static Web Apps
2. Configure build settings:
   - App location: `/`
   - Api location: (leave empty)
   - Output location: `dist`
3. Set environment variables in Azure Portal
4. Deploy automatically via GitHub Actions or manually using Azure CLI

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Profile.jsx          # Protected profile page component
│   │   ├── SignInButton.jsx     # Sign-in button component
│   │   └── SignOutButton.jsx    # Sign-out button component
│   ├── App.jsx                  # Main application component
│   ├── App.css                  # Application styles
│   ├── authConfig.js            # MSAL configuration
│   └── main.jsx                 # Application entry point
├── dist/                        # Production build output
├── staticwebapp.config.json     # Azure Static Web Apps configuration
├── vite.config.js              # Vite build configuration
└── package.json                 # Project dependencies and scripts
```

## Authentication Flow

1. User clicks "Sign In" button
2. Application redirects to Microsoft Entra External ID login page
3. User authenticates with credentials
4. Microsoft Entra External ID redirects back to application with authorization code
5. Application exchanges code for tokens
6. User is authenticated and can access protected pages
7. User profile information is displayed from ID token claims

## Technologies Used

- **React 18**: Modern UI library
- **Vite**: Fast build tool and development server
- **MSAL Browser**: Microsoft Authentication Library for browser applications
- **MSAL React**: React bindings for MSAL
- **Azure Static Web Apps**: Hosting platform

## Security Considerations

- Tokens are stored in session storage (not persistent cookies)
- All authentication requests use HTTPS in production
- Redirect URIs must be explicitly configured in Azure Portal
- Token validation is handled automatically by MSAL

## Troubleshooting

### Common Issues

**Authentication fails:**
- Verify environment variables are correctly set
- Check that redirect URI matches Azure Portal configuration
- Ensure user flow name is correct

**User profile information not displayed:**
- Verify optional claims are configured in Azure Portal
- Check user flow application assignments
- Review browser console for token claim information

**CORS errors:**
- Ensure redirect URI is properly configured
- Check that the application is using the correct tenant domain

## License

This project is provided as-is for demonstration purposes.

## Contributing

Contributions, issues, and feature requests are welcome. Please feel free to open an issue or submit a pull request.

## Support

For issues related to Microsoft Entra External ID, refer to the [official Microsoft documentation](https://learn.microsoft.com/en-us/entra/external-id/).

