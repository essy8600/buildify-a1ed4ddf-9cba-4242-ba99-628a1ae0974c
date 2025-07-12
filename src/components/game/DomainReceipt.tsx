
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

const DomainReceipt: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleDownload = () => {
    // Create a blob with receipt content
    const receiptContent = `
      DOMAIN REGISTRATION RECEIPT
      
      Domain: blogwriter.uk
      URL: https://blogwriter.uk
      Registration Date: ${new Date().toLocaleDateString()}
      Status: Active
      
      Thank you for your registration!
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'domain_receipt.txt';
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Domain Information</CardTitle>
        <CardDescription>View and download your domain receipt</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p><strong>Domain:</strong> blogwriter.uk</p>
          <p><strong>URL:</strong> https://blogwriter.uk</p>
          <p><strong>Status:</strong> Active</p>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">View Domain Receipt</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Domain Registration Receipt</DialogTitle>
              <DialogDescription>
                Receipt for your domain registration
              </DialogDescription>
            </DialogHeader>
            
            <div className="border p-4 rounded-md space-y-2 my-4">
              <h3 className="font-bold text-center text-lg">DOMAIN REGISTRATION RECEIPT</h3>
              <div className="space-y-2 mt-4">
                <p><strong>Domain:</strong> blogwriter.uk</p>
                <p><strong>URL:</strong> https://blogwriter.uk</p>
                <p><strong>Registration Date:</strong> {new Date().toLocaleDateString()}</p>
                <p><strong>Status:</strong> Active</p>
              </div>
              <p className="text-center mt-4">Thank you for your registration!</p>
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button onClick={handlePrint} className="flex-1">Print Receipt</Button>
              <Button onClick={handleDownload} className="flex-1">Download Receipt</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default DomainReceipt;