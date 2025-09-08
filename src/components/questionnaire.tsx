'use client';

import type { Question } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

type QuestionnaireProps = {
  question: Question;
  answer: string;
  onAnswer: (questionId: string, answer: string) => void;
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
};

export default function Questionnaire({
  question,
  answer,
  onAnswer,
  onNext,
  onBack,
  isFirst,
}: QuestionnaireProps) {

  const isAnswerValid = useMemo(() => {
    if (question.validate) {
      return question.validate(answer);
    }
    return answer.trim() !== '';
  }, [answer, question]);

  const renderInput = () => {
    switch (question.type) {
      case 'radio':
        return (
          <RadioGroup
            value={answer}
            onValueChange={value => onAnswer(question.id, value)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {question.options?.map(option => (
              <Label
                key={option}
                htmlFor={`${question.id}-${option}`}
                className={cn(
                  'flex items-center space-x-2 rounded-md border p-4 transition-all hover:bg-accent/50',
                  answer === option && 'bg-accent text-accent-foreground border-accent-foreground/50'
                )}
              >
                <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                <span>{option}</span>
              </Label>
            ))}
          </RadioGroup>
        );
      case 'text':
        return (
          <Input
            id={question.id}
            value={answer}
            onChange={e => onAnswer(question.id, e.target.value)}
            placeholder="Type your answer here..."
            autoFocus
          />
        );
      case 'longtext':
        return (
          <Textarea
            id={question.id}
            value={answer}
            onChange={e => onAnswer(question.id, e.target.value)}
            placeholder="Provide a detailed answer..."
            rows={5}
          />
        );
      default:
        return null;
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && question.type !== 'longtext' && isAnswerValid) {
      onNext();
    }
  };

  return (
    <Card className="w-full shadow-lg" onKeyDown={handleKeyPress}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          {question.text}
        </CardTitle>
        {question.subtext && (
          <CardDescription>{question.subtext}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="min-h-[120px]">{renderInput()}</CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack} disabled={isFirst}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={onNext} disabled={!isAnswerValid}>
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
