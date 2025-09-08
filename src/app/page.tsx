'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { questions } from '@/lib/questions';
import { assembleContract } from '@/lib/engine';
import type { Question } from '@/lib/types';
import Questionnaire from '@/components/questionnaire';
import ContractDisplay from '@/components/contract-display';
import { Logo } from '@/components/icons';
import { Progress } from '@/components/ui/progress';

export default function Home() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(
    questions[0].id
  );
  const [history, setHistory] = useState<string[]>([]);
  const [finalContract, setFinalContract] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);

  const currentQuestion: Question | undefined = questions.find(
    q => q.id === currentQuestionId
  );
  const currentQuestionIndex = questions.findIndex(
    q => q.id === currentQuestionId
  );

  useEffect(() => {
    if (currentQuestionId === null && Object.keys(answers).length > 0) {
      const contract = assembleContract(answers);
      setFinalContract(contract);
    }
  }, [currentQuestionId, answers]);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (!currentQuestion) return;

    const currentAnswer = answers[currentQuestion.id];
    if (
      currentAnswer === undefined ||
      (typeof currentAnswer === 'string' && currentAnswer.trim() === '')
    ) {
      // Optionally, show an error message
      return;
    }
    setDirection(1);
    setHistory(prev => [...prev, currentQuestion.id]);
    const nextQuestionId = currentQuestion.next(currentAnswer, answers);
    setCurrentQuestionId(nextQuestionId);
  };

  const handleBack = () => {
    if (history.length === 0) return;
    setDirection(-1);
    const previousQuestionId = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setCurrentQuestionId(previousQuestionId);
  };

  const handleStartOver = () => {
    setAnswers({});
    setCurrentQuestionId(questions[0].id);
    setHistory([]);
    setFinalContract(null);
    setDirection(1);
  };

  const totalQuestions = questions.length; // This is a simplification. A more accurate progress requires knowing the path.
  const progress = finalContract
    ? 100
    : ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <main className="flex flex-col items-center p-4 sm:p-8 min-h-full bg-background">
      <div className="w-full max-w-3xl flex-grow flex flex-col">
        <header className="flex items-center gap-3 mb-8">
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">
            LegisAssembler
          </h1>
        </header>

        <div className="flex-grow flex flex-col">
          {finalContract === null ? (
            <>
              <div className="mb-4">
                <Progress value={progress} className="w-full h-2" />
                {currentQuestion && (
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                  </p>
                )}
              </div>
              <AnimatePresence initial={false} custom={direction}>
                {currentQuestion && (
                  <motion.div
                    key={currentQuestionId}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    className="w-full"
                  >
                    <Questionnaire
                      question={currentQuestion}
                      answer={answers[currentQuestion.id] || ''}
                      onAnswer={handleAnswer}
                      onNext={handleNext}
                      onBack={handleBack}
                      isFirst={history.length === 0}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <ContractDisplay
                  contractText={finalContract}
                  onStartOver={handleStartOver}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        <footer className="text-center text-xs text-muted-foreground mt-8">
          <p>&copy; {new Date().getFullYear()} LegisAssembler. All Rights Reserved.</p>
          <p>This is a tool for professional use. Consult with a qualified lawyer for legal advice.</p>
        </footer>
      </div>
    </main>
  );
}
