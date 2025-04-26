import React, { useState, ChangeEvent } from 'react';
import { 
  Container, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Paper,
  Box,
  ButtonGroup,
  CircularProgress,
  Autocomplete,
  Chip,
  Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface Skill {
  name: string;
  income: number;
  growth: number;
}

// Simulated database of skills and their average incomes and growth rates
const skillDatabase: Skill[] = [
  { name: "Artificial Intelligence", income: 120000, growth: 23 },
  { name: "Machine Learning", income: 110000, growth: 21 },
  { name: "Deep Learning", income: 115000, growth: 22 },
  { name: "Computer Vision", income: 125000, growth: 24 },
  { name: "Natural Language Processing", income: 118000, growth: 20 },
  { name: "Data Science", income: 112000, growth: 19 },
  { name: "Python", income: 105000, growth: 15 },
  { name: "JavaScript", income: 100000, growth: 12 },
  { name: "React", income: 108000, growth: 14 },
  { name: "Node.js", income: 102000, growth: 13 },
  { name: "Cloud Computing", income: 115000, growth: 18 },
  { name: "DevOps", income: 110000, growth: 17 },
  { name: "Cybersecurity", income: 118000, growth: 20 },
  { name: "Blockchain", income: 122000, growth: 25 },
  { name: "Mobile Development", income: 105000, growth: 16 }
];

const SkillsIncomeTracker: React.FC = () => {
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddSkill = (skill: Skill | null) => {
    if (!skill) return;
    
    if (selectedSkills.length >= 5) {
      alert('You can only add up to 5 skills!');
      return;
    }

    if (selectedSkills.some(s => s.name === skill.name)) {
      alert('This skill has already been added!');
      return;
    }

    const newSkills = [...selectedSkills, skill];
    setSelectedSkills(newSkills);

    if (newSkills.length === 5) {
      setIsLoading(true);
      // Simulate loading for better UX
      setTimeout(() => {
        setIsLoading(false);
        setShowLeaderboard(true);
      }, 1000);
    }
  };

  const handleRemoveSkill = (skillToRemove: Skill) => {
    const newSkills = selectedSkills.filter(skill => skill.name !== skillToRemove.name);
    setSelectedSkills(newSkills);
    if (showLeaderboard) {
      setShowLeaderboard(false);
    }
  };

  const handleReset = () => {
    setSelectedSkills([]);
    setShowLeaderboard(false);
  };

  const sortedSkills = [...selectedSkills].sort((a, b) => b.income - a.income);

  // Get recommended skills (3 highest income skills not in selectedSkills)
  const recommendedSkills = skillDatabase
    .filter(skill => !selectedSkills.some(s => s.name === skill.name))
    .sort((a, b) => b.income - a.income)
    .slice(0, 3);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Skill Recommender
        </Typography>
        
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Select 5 skills to see the leaderboard
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Autocomplete
              options={skillDatabase}
              getOptionLabel={(option) => option.name}
              onChange={(_, value) => handleAddSkill(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search for a skill"
                  fullWidth
                />
              )}
              disabled={selectedSkills.length >= 5}
            />
          </Box>
          
          {selectedSkills.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Selected Skills:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {selectedSkills.map((skill) => (
                  <Chip
                    key={skill.name}
                    label={skill.name}
                    onDelete={() => handleRemoveSkill(skill)}
                    deleteIcon={<DeleteIcon />}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Stack>
            </Box>
          )}

          <ButtonGroup fullWidth sx={{ mb: 2 }}>
            <Button 
              variant="outlined" 
              onClick={handleReset}
            >
              Reset
            </Button>
          </ButtonGroup>
          <Typography variant="body2" color="text.secondary">
            Skills selected: {selectedSkills.length}/5
          </Typography>
        </Paper>

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {showLeaderboard && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom align="center">
                Skills Income and Growth Leaderboard
              </Typography>
              <List>
                {sortedSkills.map((skill, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${index + 1}. ${skill.name}`}
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Typography variant="body2">
                            ${skill.income.toLocaleString()} per year
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                            <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                            <Typography variant="body2">
                              {skill.growth}% growth
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>

            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom align="center">
                Recommended Skills Growth Rate and Income
              </Typography>
              <List>
                {recommendedSkills.map((skill, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${index + 1}. ${skill.name}`}
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Typography variant="body2">
                            ${skill.income.toLocaleString()} per year
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                            <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                            <Typography variant="body2">
                              {skill.growth}% growth
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button 
                variant="outlined" 
                onClick={handleReset}
                color="primary"
              >
                Start Over
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default SkillsIncomeTracker; 