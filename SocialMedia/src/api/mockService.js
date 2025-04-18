
// Sample user data
const users = {
  "1": "John Doe",
  "10": "Helen Moore",
  "11": "Ivy Taylor",
  "12": "Jack Anderson",
  "13": "Kathy Thomas",
  "14": "Liam Jackson",
  "8": "Fiona Miller",
  "9": "George Wilson"
};

const posts = [
  {
    id: 101,
    userid: 1,
    content: "Just discovered an amazing new coffee shop downtown! Their cold brew is exceptional. #CoffeeAddict",
    timestamp: new Date('2023-05-01T09:30:00').getTime()
  },
  {
    id: 102,
    userid: 10,
    content: "Finished my first marathon today! 26.2 miles of pure determination. Feeling proud and exhausted. #Running #Achievement",
    timestamp: new Date('2023-05-02T15:45:00').getTime()
  },
  {
    id: 103,
    userid: 11,
    content: "This new sci-fi novel is blowing my mind. Can't put it down! Has anyone else read 'Echoes of Eternity'? #BookRecommendation",
    timestamp: new Date('2023-05-03T18:20:00').getTime()
  },
  {
    id: 104,
    userid: 12,
    content: "My homemade pizza recipe perfected after 10 attempts. The secret is in the dough fermentation! #Cooking #FoodLover",
    timestamp: new Date('2023-05-04T19:15:00').getTime()
  },
  {
    id: 105,
    userid: 13,
    content: "Just adopted this sweet rescue puppy! Meet Luna, my new best friend. #AdoptDontShop #DogLover",
    timestamp: new Date('2023-05-05T12:40:00').getTime()
  },
  {
    id: 106,
    userid: 14,
    content: "The sunset at the beach tonight was absolutely spectacular. Nature's light show never disappoints. #NatureLover #Sunset",
    timestamp: new Date('2023-05-06T20:10:00').getTime()
  },
  {
    id: 107,
    userid: 8,
    content: "Finally finished that home office renovation project! Before and after pics coming soon. #DIY #HomeImprovement",
    timestamp: new Date('2023-05-07T16:30:00').getTime()
  },
  {
    id: 108,
    userid: 9,
    content: "This art exhibition downtown is phenomenal. So inspired by the creativity on display. #Art #Culture",
    timestamp: new Date('2023-05-08T14:20:00').getTime()
  }
];

// Sample comments data
const comments = [
  { id: 201, postid: 101, content: "Where is this coffee shop? I need to try it!" },
  { id: 202, postid: 101, content: "Their pastries are amazing too!" },
  { id: 203, postid: 101, content: "I'm more of a tea person myself, but might check it out." },
  
  { id: 204, postid: 102, content: "Congratulations! That's an amazing achievement!" },
  { id: 205, postid: 102, content: "Any tips for someone training for their first 5K?" },
  { id: 206, postid: 102, content: "Which marathon was it?" },
  { id: 207, postid: 102, content: "You're inspiring me to start running again!" },
  { id: 208, postid: 102, content: "Well done! Rest up and celebrate!" },
  
  { id: 209, postid: 103, content: "I loved that book! The plot twist at the end was unexpected." },
  { id: 210, postid: 103, content: "Adding it to my reading list!" },
  
  { id: 211, postid: 104, content: "Would you share your recipe? I'm always struggling with pizza dough." },
  { id: 212, postid: 104, content: "Looks delicious! What toppings did you use?" },
  { id: 213, postid: 104, content: "Nothing beats homemade pizza!" },
  
  { id: 214, postid: 105, content: "Luna is adorable! Rescue dogs are the best." },
  { id: 215, postid: 105, content: "What breed is she? She looks like she has some lab in her." },
  { id: 216, postid: 105, content: "Those eyes! So cute!" },
  { id: 217, postid: 105, content: "Thank you for adopting!" },
  
  { id: 218, postid: 106, content: "Stunning photo! Which beach is this?" },
  { id: 219, postid: 106, content: "The colors are incredible. Nature's palette is unmatched." },
  
  { id: 220, postid: 107, content: "Can't wait to see the transformation!" },
  { id: 221, postid: 107, content: "I'm about to start a similar project. Any lessons learned?" },
  
  { id: 222, postid: 108, content: "Is it the modern art exhibition at the Meridian Gallery?" },
  { id: 223, postid: 108, content: "Art is such a powerful form of expression." }
];

posts.forEach(post => {
  post.commentCount = comments.filter(c => c.postid === post.id).length;
});

const mockService = {
  // Get all users
  getUsers: () => {
    return Promise.resolve({ users });
  },
  
  getUserPosts: (userId) => {
    const userPosts = posts.filter(post => post.userid.toString() === userId.toString());
    return Promise.resolve({ posts: userPosts });
  },
  
  getPosts: (type = 'latest') => {
    let filteredPosts = [...posts];
    
    if (type === 'popular') {
      // Sort by comment count (descending)
      filteredPosts.sort((a, b) => b.commentCount - a.commentCount);
    } else {
      filteredPosts.sort((a, b) => b.timestamp - a.timestamp);
    }
    
    return Promise.resolve({ posts: filteredPosts });
  },
  
  // Get comments for a post
  getPostComments: (postId) => {
    const postComments = comments.filter(comment => comment.postid.toString() === postId.toString());
    return Promise.resolve({ comments: postComments });
  }
};

export default mockService;