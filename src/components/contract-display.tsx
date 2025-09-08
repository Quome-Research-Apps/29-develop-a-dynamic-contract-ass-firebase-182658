'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ClipboardCopy, RefreshCcw } from 'lucide-react';

type ContractDisplayProps = {
  contractText: string;
  onStartOver: () => void;
};

export default function ContractDisplay({
  contractText,
  onStartOver,
}: ContractDisplayProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard
      .writeText(contractText)
      .then(() => {
        toast({
          title: 'Copied to clipboard!',
          description: 'The contract text is now on your clipboard.',
        });
      })
      .catch(err => {
        toast({
          variant: 'destructive',
          title: 'Copy failed',
          description: 'Could not copy text to clipboard.',
        });
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          Your Contract is Ready
        </CardTitle>
        <CardDescription>
          Review the generated contract below. You can copy it to your clipboard
          for use in your preferred editor.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          value={contractText}
          readOnly
          rows={20}
          className="font-mono text-sm bg-muted/30"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onStartOver}>
          <RefreshCcw className="mr-2 h-4 w-4" />
          Start Over
        </Button>
        <Button onClick={handleCopy}>
          <ClipboardCopy className="mr-2 h-4 w-4" />
          Copy to Clipboard
        </Button>
      </CardFooter>
    </Card>
  );
}
