
import React from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

const DomainReceipt: React.FC = () => {
  const generateReceipt = () => {
    const receiptContent = `
      DOMAIN REGISTRATION RECEIPT
      --------------------------
      
      Domain Name: blogwriter.uk
      Registration Date: ${new Date().toLocaleDateString()}
      Expiration Date: ${new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString()}
      
      Registrant Information:
      Name: Aviator Bet
      Email: support@blogwriter.uk
      
      Domain Status: Active
      URL: https://blogwriter.uk
      
      Payment Information:
      Amount Paid: $15.99 USD
      Payment Method: Credit Card
      Transaction ID: DOM-${Math.random().toString(36).substring(2, 10).toUpperCase()}
      
      This receipt serves as proof of domain registration.
      Please keep this for your records.
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'domain_receipt_blogwriter_uk.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const printReceipt = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const receiptHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Domain Registration Receipt</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .receipt {
            border: 1px solid #ccc;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
          }
          .section {
            margin-bottom: 15px;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 0.9em;
            color: #666;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          table td {
            padding: 5px;
          }
          .label {
            font-weight: bold;
            width: 40%;
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <h1>Domain Registration Receipt</h1>
          </div>
          
          <div class="section">
            <table>
              <tr>
                <td class="label">Domain Name:</td>
                <td>blogwriter.uk</td>
              </tr>
              <tr>
                <td class="label">Registration Date:</td>
                <td>${new Date().toLocaleDateString()}</td>
              </tr>
              <tr>
                <td class="label">Expiration Date:</td>
                <td>${new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString()}</td>
              </tr>
            </table>
          </div>
          
          <div class="section">
            <h3>Registrant Information</h3>
            <table>
              <tr>
                <td class="label">Name:</td>
                <td>Aviator Bet</td>
              </tr>
              <tr>
                <td class="label">Email:</td>
                <td>support@blogwriter.uk</td>
              </tr>
            </table>
          </div>
          
          <div class="section">
            <h3>Domain Status</h3>
            <table>
              <tr>
                <td class="label">Status:</td>
                <td>Active</td>
              </tr>
              <tr>
                <td class="label">URL:</td>
                <td>https://blogwriter.uk</td>
              </tr>
            </table>
          </div>
          
          <div class="section">
            <h3>Payment Information</h3>
            <table>
              <tr>
                <td class="label">Amount Paid:</td>
                <td>$15.99 USD</td>
              </tr>
              <tr>
                <td class="label">Payment Method:</td>
                <td>Credit Card</td>
              </tr>
              <tr>
                <td class="label">Transaction ID:</td>
                <td>DOM-${Math.random().toString(36).substring(2, 10).toUpperCase()}</td>
              </tr>
            </table>
          </div>
          
          <div class="footer">
            <p>This receipt serves as proof of domain registration. Please keep this for your records.</p>
          </div>
        </div>
        
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `;
    
    printWindow.document.write(receiptHTML);
    printWindow.document.close();
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Domain Receipt
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Domain Registration Receipt</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Domain Information</h3>
            <p><span className="text-gray-400">Domain:</span> blogwriter.uk</p>
            <p><span className="text-gray-400">Status:</span> Active</p>
            <p><span className="text-gray-400">URL:</span> https://blogwriter.uk</p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={generateReceipt} 
              className="flex-1"
            >
              Download Receipt
            </Button>
            
            <Button 
              onClick={printReceipt} 
              className="flex-1"
              variant="outline"
            >
              Print Receipt
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DomainReceipt;