interface Activity {
    name: string;
    time: string;
    image: string;
  }
  
  interface Day {
    dayNumber: number;
    activities: Activity[];
  }
  
  export const dummyDays: Day[] = [
    {
      dayNumber: 1,
      activities: [
        { 
          name: 'Hiking Trail Fira-Oia', 
          time: '9:00 am', 
          image:'https://images.unsplash.com/photo-1519344731454-aa212f81ff26?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
        },
        { 
          name: 'Amoudi Bay', 
          time: '11:00 am', 
          image:'https://images.unsplash.com/photo-1653051487585-a219fc18b64b?q=80&w=1843&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
        },
        { 
          name: 
          'Sunset in Oia', 
          time: '7:00 pm', 
          image:'https://images.unsplash.com/photo-1642195349088-953f63a7d4df?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
          name: 'Three Bells of Fira',
          time: '8:30 pm',
          image: 'https://images.unsplash.com/photo-1605212989851-63647ae5dad9?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          name: 'Lost Atlantis Experience',
          time: '10:00 pm',
          image: 'https://images.unsplash.com/photo-1583154641816-4a9e065c0a6d?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
      ],
    },
    {
      dayNumber: 2,
      activities: [
        { 
          name: 'Ancient Thera', 
          time: '10:30 am', 
          image: 'https://images.unsplash.com/photo-1535406819235-f542ab3050ad?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
        },
        { 
          name: 'Skaros Rock', 
          time: '2:00 pm', 
          image:'https://images.unsplash.com/photo-1505160984683-51670af82409?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
          name: 'Museum of Prehistoric Thira',
          time: '5:30 pm',
          image:'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
      ],
    },
    {
      dayNumber: 3,
      activities: [
        {
          name: 'Santorini cable car',
          time: '11:30 am',
          image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          name: 'Nea Kameni',
          time: '4:30 am',
          image: 'https://images.unsplash.com/photo-1588917605484-10ceb4a09322?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
      ],
    }
  ];
  