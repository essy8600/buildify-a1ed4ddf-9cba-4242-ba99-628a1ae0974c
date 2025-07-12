
import React from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

const DomainReceipt: React.FC = () => {
  const generateReceipt = () => {
    const receiptContent = `
      DOMAIN REGISTRATION RECEIPT
      --------------------------
      
      Domain Name: blogwriter.uk
      Registration Date: July 12, 2025
      Expiration Date: July 12, 2026
      
      Registrar: Buildify Domains
      URL: https://blogwriter.uk
      
      Status: Active
      
      Thank you for your registration!
    `;
    
    // Create a Blob with the receipt content
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'domain_receipt_blogwriter_uk.txt';
    
    // Trigger the download
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Domain Receipt
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Domain Registration Receipt</DialogTitle>
        </DialogHeader>
        
        <div className="p-4 border border-gray-600 rounded-lg bg-gray-700 my-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Domain:</span>
              <span className="font-medium">blogwriter.uk</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Registration Date:</span>
              <span className="font-medium">July 12, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Expiration Date:</span>
              <span className="font-medium">July 12, 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span className="text-green-400 font-medium">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">URL:</span>
              <span className="font-medium">https://blogwriter.uk</span>
            </div>
          </div>
        </div>
        
        <Button onClick={generateReceipt} className="w-full">
          Download Receipt
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DomainReceipt;