import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Badge,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Types pour les messages et conversations
interface Message {
  id: number;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  date: string;
  unread: number;
  online: boolean;
}

interface MessagesState {
  [key: number]: Message[];
}

// Données de démonstration pour les conversations
const demoConversations: Conversation[] = [
  {
    id: 1,
    name: 'Support Technique',
    avatar: '/avatars/support.png',
    lastMessage: 'Comment puis-je vous aider aujourd\'hui?',
    date: '09:45',
    unread: 1,
    online: true,
  },
  {
    id: 2,
    name: 'Équipe Analyse',
    avatar: '/avatars/team.png',
    lastMessage: 'Voici le rapport sur SONATEL que vous avez demandé',
    date: 'Hier',
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: 'Notifications',
    avatar: '/avatars/notifications.png',
    lastMessage: 'SONATEL vient de franchir votre seuil d\'alerte de 12000 FCFA',
    date: 'Mar 15',
    unread: 3,
    online: false,
  },
  {
    id: 4,
    name: 'Conseiller Financier',
    avatar: '/avatars/advisor.png',
    lastMessage: 'Souhaitez-vous planifier un rendez-vous cette semaine?',
    date: 'Lun 14',
    unread: 0,
    online: false,
  },
];

// Données de démonstration pour les messages
const demoMessages: MessagesState = {
  1: [
    { id: 1, sender: 'them', text: 'Bonjour, bienvenue sur MODERANT BRVM! Comment puis-je vous aider aujourd\'hui?', time: '09:30' },
    { id: 2, sender: 'me', text: 'Bonjour, je voudrais savoir comment configurer des alertes pour certaines actions', time: '09:35' },
    { id: 3, sender: 'them', text: 'Bien sûr! Pour configurer des alertes, rendez-vous dans votre tableau de bord, puis cliquez sur l\'onglet "Alertes". Vous pourrez y définir des conditions spécifiques pour chaque action qui vous intéresse.', time: '09:40' },
    { id: 4, sender: 'them', text: 'Avez-vous d\'autres questions?', time: '09:45' },
  ],
  2: [
    { id: 1, sender: 'them', text: 'Bonjour, nous avons analysé les données récentes pour SONATEL', time: '14:20 (Hier)' },
    { id: 2, sender: 'them', text: 'Voici le rapport sur SONATEL que vous avez demandé. Il contient une analyse technique et fondamentale complète.', time: '14:25 (Hier)' },
    { id: 3, sender: 'me', text: 'Merci beaucoup! Je vais l\'examiner et revenir vers vous si j\'ai des questions.', time: '15:30 (Hier)' },
  ],
  3: [
    { id: 1, sender: 'them', text: 'ORABANK a publié ses résultats trimestriels: +12% de revenus', time: '10:15 (Mar 15)' },
    { id: 2, sender: 'them', text: 'SONATEL distribue un dividende exceptionnel de 15%', time: '13:20 (Mar 15)' },
    { id: 3, sender: 'them', text: 'SONATEL vient de franchir votre seuil d\'alerte de 12000 FCFA', time: '16:45 (Mar 15)' },
  ],
  4: [
    { id: 1, sender: 'them', text: 'Bonjour, suite à votre récente activité sur la plateforme, je voudrais vous proposer un rendez-vous pour discuter de stratégies d\'investissement adaptées à votre profil.', time: '11:05 (Lun 14)' },
    { id: 2, sender: 'me', text: 'Bonjour, merci pour votre proposition. Je serais intéressé par un rendez-vous.', time: '13:15 (Lun 14)' },
    { id: 3, sender: 'them', text: 'Parfait! Quelles sont vos disponibilités? Souhaitez-vous planifier un rendez-vous cette semaine?', time: '14:30 (Lun 14)' },
  ],
};

const Messages: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [selectedConversation, setSelectedConversation] = useState<number>(1);
  const [newMessage, setNewMessage] = useState<string>('');
  const [conversations, setConversations] = useState<Conversation[]>(demoConversations);
  const [messages, setMessages] = useState<MessagesState>(demoMessages);
  const [mobileView, setMobileView] = useState<'list' | 'chat'>(isMobile ? 'list' : 'chat');
  
  const handleSelectConversation = (id: number) => {
    setSelectedConversation(id);
    
    // Marquer comme lus les messages de cette conversation
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === id ? { ...conv, unread: 0 } : conv
      )
    );
    
    if (isMobile) {
      setMobileView('chat');
    }
  };
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newMessageObj: Message = {
      id: messages[selectedConversation]?.length + 1 || 1,
      sender: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages(prevMessages => ({
      ...prevMessages,
      [selectedConversation]: [...(prevMessages[selectedConversation] || []), newMessageObj],
    }));
    
    setNewMessage('');
  };
  
  const handleBackToList = () => {
    setMobileView('list');
  };
  
  return (
    <Box 
      sx={{ 
        py: { xs: 2, sm: 3, md: 4 }, 
        px: { xs: 1, sm: 2, md: 3 }, 
        width: '100%', 
        height: 'calc(100vh - 150px)' 
      }}
    >
      <Container 
        maxWidth={false} 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column' 
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            mb: { xs: 2, sm: 3, md: 4 }, 
            fontWeight: 600,
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
            background: 'linear-gradient(to right, #00C6AE, #2D8CFF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Messages
        </Typography>
        
        <Paper 
          sx={{ 
            flexGrow: 1,
            display: 'flex',
            background: 'rgba(35, 39, 47, 0.5)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            overflow: 'hidden',
            height: 'calc(100% - 50px)',
          }}
        >
          {/* Liste des conversations */}
          {(!isMobile || mobileView === 'list') && (
            <Box 
              sx={{ 
                width: { xs: '100%', md: '350px' },
                borderRight: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ p: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <TextField
                  fullWidth
                  placeholder="Rechercher un message"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                  }}
                />
              </Box>
              <List sx={{ overflow: 'auto', flexGrow: 1 }}>
                {conversations.map((conversation) => (
                  <ListItem 
                    key={conversation.id}
                    onClick={() => handleSelectConversation(conversation.id)}
                    selected={selectedConversation === conversation.id}
                    sx={{
                      px: 2,
                      py: 1.5,
                      borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
                      backgroundColor: selectedConversation === conversation.id 
                        ? 'rgba(0, 198, 174, 0.1)' 
                        : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 198, 174, 0.05)',
                      },
                      cursor: 'pointer',
                    }}
                  >
                    <ListItemAvatar>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                        sx={{
                          '& .MuiBadge-badge': {
                            backgroundColor: conversation.online ? '#00C6AE' : 'transparent',
                            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                          },
                        }}
                      >
                        <Avatar 
                          src={conversation.avatar}
                          sx={{ 
                            bgcolor: !conversation.avatar ? theme.palette.primary.main : undefined 
                          }}
                        >
                          {!conversation.avatar && conversation.name.charAt(0)}
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography 
                          variant="subtitle1" 
                          sx={{ 
                            fontWeight: conversation.unread > 0 ? 600 : 400,
                            color: theme.palette.text.primary,
                          }}
                        >
                          {conversation.name}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="body2"
                          noWrap
                          sx={{
                            color: conversation.unread > 0 
                              ? theme.palette.text.primary 
                              : theme.palette.text.secondary,
                            fontWeight: conversation.unread > 0 ? 500 : 400,
                          }}
                        >
                          {conversation.lastMessage}
                        </Typography>
                      }
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', ml: 1 }}>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: theme.palette.text.secondary,
                          mb: 0.5,
                        }}
                      >
                        {conversation.date}
                      </Typography>
                      {conversation.unread > 0 && (
                        <Badge 
                          badgeContent={conversation.unread} 
                          color="primary"
                          sx={{
                            '& .MuiBadge-badge': {
                              fontSize: '0.75rem',
                              height: 22,
                              minWidth: 22,
                            },
                          }}
                        />
                      )}
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
          
          {/* Zone de conversation */}
          {(!isMobile || mobileView === 'chat') && (
            <Box 
              sx={{ 
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              {/* En-tête de conversation */}
              <Box 
                sx={{ 
                  p: 2, 
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {isMobile && (
                  <IconButton 
                    sx={{ mr: 1 }} 
                    onClick={handleBackToList}
                    color="primary"
                  >
                    <Box sx={{ transform: 'rotate(180deg)' }}>
                      <SendIcon />
                    </Box>
                  </IconButton>
                )}
                
                <Avatar 
                  src={conversations.find(c => c.id === selectedConversation)?.avatar}
                  sx={{ 
                    bgcolor: theme.palette.primary.main,
                    mr: 2,
                  }}
                >
                  {conversations.find(c => c.id === selectedConversation)?.name.charAt(0)}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {conversations.find(c => c.id === selectedConversation)?.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {conversations.find(c => c.id === selectedConversation)?.online 
                      ? 'En ligne' 
                      : 'Hors ligne'}
                  </Typography>
                </Box>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Box>
              
              {/* Messages */}
              <Box 
                sx={{ 
                  p: 2, 
                  flexGrow: 1, 
                  overflow: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {messages[selectedConversation]?.map((message: Message) => (
                  <Box
                    key={message.id}
                    sx={{
                      alignSelf: message.sender === 'me' ? 'flex-end' : 'flex-start',
                      mb: 2,
                      maxWidth: '80%',
                    }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        borderRadius: '16px',
                        borderBottomRightRadius: message.sender === 'me' ? '4px' : '16px',
                        borderBottomLeftRadius: message.sender === 'me' ? '16px' : '4px',
                        backgroundColor: message.sender === 'me' 
                          ? 'rgba(0, 198, 174, 0.15)' 
                          : 'rgba(35, 39, 47, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                      }}
                    >
                      <Typography variant="body1">
                        {message.text}
                      </Typography>
                    </Paper>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        mt: 0.5, 
                        display: 'block',
                        color: theme.palette.text.secondary,
                        textAlign: message.sender === 'me' ? 'right' : 'left',
                      }}
                    >
                      {message.time}
                    </Typography>
                  </Box>
                ))}
              </Box>
              
              {/* Zone de saisie */}
              <Box sx={{ p: 2, borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton color="primary">
                    <AttachFileIcon />
                  </IconButton>
                  <TextField
                    fullWidth
                    placeholder="Tapez votre message..."
                    variant="outlined"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                    sx={{
                      mx: 1,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '24px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      },
                    }}
                  />
                  <IconButton 
                    color="primary" 
                    onClick={handleSendMessage}
                    disabled={newMessage.trim() === ''}
                    sx={{
                      bgcolor: 'rgba(0, 198, 174, 0.1)',
                      '&:hover': {
                        bgcolor: 'rgba(0, 198, 174, 0.2)',
                      },
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Messages; 