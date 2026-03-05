# Transaction System - Deposits, Withdrawals & Dividends

## Overview

The transaction system has been enhanced to support three types of transactions:
- **Deposits**: Users can deposit funds into their accounts via Stripe
- **Withdrawals**: Users can withdraw funds from their accounts via Stripe
- **Dividends**: Admins can distribute dividends to users

## Features

### 1. User Dashboard Transactions Page

**Location**: `/dashboard/transactions`

**Features**:
- **Deposit Button**: Opens a modal to initiate a deposit
- **Withdraw Button**: Opens a modal to initiate a withdrawal
- **Filter Tabs**: Filter transactions by type (All, Deposits, Withdrawals, Dividends)
- **Transaction Statistics**: Shows totals for each transaction type
- **Transaction History**: Displays all transactions with type indicators
- **Investment Timeline**: Chart showing historical transaction data

### 2. Admin Transaction Management

**Location**: `/admin/transactions`

**Features**:
- Select a user to manage transactions
- Add new transactions including:
  - **Type Selection**: Choose between Dividend, Deposit, or Withdrawal
  - **Status Management**: Set transaction status (Pending, Completed, Failed, Cancelled)
  - **Amount Entry**: Specify transaction amount
  - **Details**: Add notes about the transaction
- Edit existing transactions
- Delete transactions
- View all transactions for a user

### 3. Stripe Integration

#### Setup Instructions

1. **Install Dependencies** (Already Done):
   ```bash
   npm install stripe @stripe/react-stripe-js
   ```

2. **Configure Environment Variables**:
   Add to your `.env.local` file:
   ```
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_your_public_key_here
   ```

3. **Get Stripe API Keys**:
   - Go to [Stripe Dashboard](https://dashboard.stripe.com)
   - Navigate to Developers → API Keys
   - Copy your Secret Key and Publishable Key

#### API Endpoints

**Create Payment Intent**:
```
POST /api/payments/create-intent
```
Request Body:
```json
{
  "amount": 100.50,
  "type": "deposit",
  "description": "User deposit"
}
```

Response:
```json
{
  "clientSecret": "pi_xxx...",
  "intentId": "pi_xxx..."
}
```

**Confirm Payment**:
```
POST /api/payments/confirm-payment
```
Request Body:
```json
{
  "intentId": "pi_xxx..."
}
```

Response:
```json
{
  "success": true,
  "transaction": {
    "id": "TRX-xxx",
    "date": "Mar 5, 2026",
    "time": "10:30 AM",
    "description": "Bank Deposit",
    "details": "Stripe Payment - pi_xxx...",
    "status": "Completed",
    "amount": "+$100.50",
    "type": "deposit",
    "stripeId": "pi_xxx..."
  }
}
```

## Database Schema

### Transaction Object

```javascript
{
  id: String,                  // Unique transaction ID (e.g., "TRX-ABC123DEF")
  date: String,                // Transaction date (e.g., "Mar 5, 2026")
  time: String,                // Transaction time (e.g., "10:30 AM")
  description: String,         // Description (e.g., "Bank Deposit")
  details: String,             // Additional details
  status: String,              // Status: "Pending", "Completed", "Failed", "Cancelled"
  amount: String,              // Formatted amount (e.g., "+$100.50", "-$50.00")
  type: String,                // Type: "deposit", "withdrawal", "dividend"
  stripeId?: String            // Stripe payment intent ID (for deposits/withdrawals)
}
```

## User Interface Components

### DepositWithdrawModal

**Location**: `src/app/components/DepositWithdrawModal.js`

**Props**:
- `isOpen` (Boolean): Whether modal is visible
- `onClose` (Function): Callback when modal closes
- `type` (String): "deposit" or "withdrawal"

**Features**:
- Amount input with currency formatting
- Real-time validation
- Automatic transaction creation on payment success
- Error and success messages
- Auto-close after successful transaction

### TransactionForm (Updated)

**Location**: `src/app/components/TransactionForm.js`

**New Fields**:
- Transaction Type Selector (Dividend, Deposit, Withdrawal)

**Usage by Admins**:
1. Select a user
2. Choose transaction type
3. Fill in transaction details
4. Submit to add transaction

## Transaction Flow

### Deposit Flow
1. User clicks "Deposit" button
2. DepositWithdrawModal opens
3. User enters amount
4. System creates Stripe PaymentIntent
5. Payment is processed (simulated for MVP)
6. Transaction is saved to database
7. Modal closes, transaction appears in history

### Withdrawal Flow
1. User clicks "Withdraw" button
2. DepositWithdrawModal opens
3. User enters amount
4. System creates Stripe PaymentIntent for withdrawal
5. Withdrawal is initiated
6. Transaction is saved with pending status
7. Admin manually processes withdrawal once funds are sent

### Dividend Flow
1. Admin navigates to `/admin/transactions`
2. Selects a user
3. Chooses "Dividend" as transaction type
4. Enters dividend amount and details
5. Clicks "Add Transaction"
6. Transaction appears in user's history with dividend type badge
7. User sees dividend in their transactions with blue badge

## Display Features

### Transaction Type Badges

- **Deposits**: Emerald green badge
- **Withdrawals**: Orange badge
- **Dividends**: Blue badge

### Transaction Statistics

Dashboard shows three cards:
- **Total Deposits**: Sum of all deposits
- **Total Withdrawals**: Sum of all withdrawals
- **Dividends Received**: Sum of all dividends

## Testing

### Test Stripe Payments

Use Stripe test cards:
- **Success**: `4242 4242 4242 4242`
- **Fail**: `4000 0000 0000 0002`
- Any future expiry date
- Any 3-digit CVC

### Test Dividends

1. Login as admin
2. Go to `/admin/transactions`
3. Select a user
4. Change transaction type to "Dividend"
5. Enter amount and click Add Transaction
6. Login as user and check transactions page

## Future Enhancements

1. **Real Stripe Integration**: Implement actual Stripe payment processing with Elements
2. **Payment History**: Link Stripe payment history to transactions
3. **Payout Management**: Admin dashboard for managing payouts
4. **Transaction Webhooks**: Handle Stripe webhook events for real-time updates
5. **Tax Reporting**: Generate tax reports for dividends
6. **Withdrawal Limits**: Set withdrawal limits per user/period
7. **Admin Approval**: Require admin approval for withdrawals
8. **Transaction Details Modal**: Show full transaction details on click

## Error Handling

### Common Errors

1. **Payment processing is not configured**
   - Cause: `STRIPE_SECRET_KEY` not set
   - Solution: Add Stripe key to `.env.local`

2. **Invalid amount**
   - Cause: Amount <= 0
   - Solution: Enter a positive amount

3. **Payment not completed**
   - Cause: Stripe payment failed
   - Solution: Check payment card and try again

## Security Considerations

1. **Authentication Required**: All payment endpoints require valid JWT token
2. **User Isolation**: Users can only view their own transactions
3. **Admin Only**: Only admins can create transactions directly
4. **Type Validation**: Transaction types are validated on backend
5. **Amount Validation**: Amounts are validated to be positive numbers

## Support

For issues or questions:
1. Check the error message in the UI
2. Review browser console for detailed errors
3. Check server logs for API errors
4. Verify Stripe API key is set correctly
5. Ensure MongoDB connection is working
