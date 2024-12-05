import { ActionIcon, Card } from '@mantine/core';
import { IconFile } from '@tabler/icons-react';

const SelectSurveyCard = () => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <Card.Section className="flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="rounded-sm bg-primary/10 p-3 mb-2">
          <ActionIcon variant="filled" aria-label="Settings">
            <IconFile style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </div>
        <h2 className="text-xl font-semibold tracking-tight">
          Select a Survey
        </h2>
        <p className="text-muted-foreground">
          Please choose a survey from the list to view its complete details and
          responses.
        </p>
        <div className="w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 rounded-full animate-pulse" />
      </Card.Section>
    </Card>
  );
};

export default SelectSurveyCard;
