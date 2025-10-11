# DV Lottery Registration Website

A modern, beautiful web application for registering users for the DV Lottery program with integrated payment processing via Commercial Bank of Ethiopia and Telebirr.

## Features

- **Modern UI/UX**: Beautiful gradient design with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Form Validation**: Client-side validation for all fields
- **Payment Integration**: Support for CBE and Telebirr payments
- **Screenshot Upload**: Secure file upload for payment confirmation
- **Netlify Forms**: Automatic form handling and data collection
- **Success Page**: Clear instructions with Telegram contact integration

## Technologies Used

- HTML5
- CSS3 (Modern design with CSS Grid and Flexbox)
- JavaScript (Vanilla JS for form validation)
- Netlify Forms (Backend form handling)

## Deployment on Netlify

### Method 1: Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Deploy the site:
```bash
netlify deploy --prod
```

### Method 2: Git Integration

1. Push this code to a GitHub repository
2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" > "Import an existing project"
4. Connect your GitHub repository
5. Netlify will automatically detect the settings from `netlify.toml`
6. Click "Deploy site"

### Method 3: Drag & Drop

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag and drop the entire project folder
3. Your site will be live immediately!

## Configuration

### Update Payment Information

Edit `index.html` to update the payment details:

```html
<!-- Commercial Bank of Ethiopia -->
<p><strong>Account Number:</strong> YOUR_ACCOUNT_NUMBER</p>

<!-- Telebirr -->
<p><strong>Telebirr Number:</strong> YOUR_TELEBIRR_NUMBER</p>
```

### Update Telegram Contact

The Telegram username is currently set to `@tegene`. To change it, update in:
- `index.html` (footer)
- `success.html` (contact section and footer)

### Netlify Forms Setup

After deployment:

1. Go to your Netlify dashboard
2. Navigate to "Forms" section
3. You'll see the "dv-lottery" form
4. Configure email notifications:
   - Go to Settings > Forms > Form notifications
   - Add your email address
   - You'll receive an email for each submission

### Accessing Form Submissions

All form submissions (including uploaded files) are stored in Netlify:
1. Log into your Netlify dashboard
2. Go to your site
3. Click on "Forms" in the menu
4. Click on "dv-lottery" to see all submissions
5. Download payment screenshots from each submission

## File Structure

```
dv/
├── index.html          # Main registration form
├── success.html        # Success/confirmation page
├── styles.css          # All styling and animations
├── script.js           # Form validation and interactivity
├── netlify.toml        # Netlify configuration
├── _redirects          # Redirect rules
└── README.md           # This file
```

## Form Fields

### Personal Information (የግል መረጃ)
1. **Name (ስም)** - First, Middle, Last Name as in passport (required)
2. **Gender (ፆታ)** - Male/Female (required)
3. **Birth Date (የልደት ቀን)** - MM/DD/YYYY format (required, must be 18+)
4. **Birth City (የተወለዱበትን ከተማ)** - City where you were born (required)
5. **Country of Birth (የተወለዱበትን ሀገር)** - (required)
6. **Country of Eligibility (ለ DV መርኃ-ግብር ብቁ የሆነ ሀገር)** - (required)
7. **Entrant Photograph (የመግቢያ ፎቶግራፍ)** - 600x600px, JPEG, max 240KB (required)
8. **Mailing Address (የፖስታ መላኪያ አድራሻ)** - Full mailing address (required)
9. **Current Country (አሁን የምንኖርበትን ሀገር)** - Country of residence (required)
10. **Phone Number (ስልክ ቁጥር)** - Ethiopian format +251... (required)
11. **Email Address (የ ኢሜል አድራሻ)** - (required)
12. **Education Level (የትምህርት ደረጃ)** - Highest level achieved (required)
13. **Marital Status (የትዳር ሁኔታ)** - Current marital status (required)
14. **Children Information (የልጆች መረጃ)** - Number and details of unmarried children (required)
    - Dynamic form fields for each child (name, DOB, gender)
- **Passport Number (የፓስፖርት ቁጥር)** - (optional)

### Payment Information (የክፍያ መረጃ)
15. **Payment Method (የክፍያ ዘዴ)** - CBE or Telebirr (required)
16. **Payment Screenshot (የክፍያ ስክሪንሾት)** - Image file upload (required)

## Security Features

- File size validation (max 10MB)
- File type validation (images only)
- Age verification (must be 18+)
- Phone number format validation
- Required field validation
- HTTPS encryption (via Netlify)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #4F46E5;
    --secondary-color: #10B981;
    --accent-color: #F59E0B;
    /* ... */
}
```

### Payment Amount

Current payment amount in `index.html`:

```html
<p><strong>Amount:</strong> 300 ETB Only</p>
```

## Support

For questions or assistance, contact via Telegram: [@tegene](https://t.me/tegene)

## License

© 2025 DV Lottery Registration Service. All rights reserved.

