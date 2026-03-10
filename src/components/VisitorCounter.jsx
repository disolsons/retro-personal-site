import { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { doc, updateDoc, increment, onSnapshot } from "firebase/firestore";

export default function VisitorCounter() {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      const statsRef = doc(db, "stats", "visitors");
  
      // 1. Listen for real-time updates to display the count
      const unsubscribe = onSnapshot(statsRef, (doc) => {
        if (doc.exists()) setCount(doc.data().count);
      });
  
      // 2. Increment only if it's a new session
      const hasVisited = sessionStorage.getItem('hasVisited');
      if (!hasVisited) {
        updateDoc(statsRef, {
          count: increment(1) // Atomically add 1 on the server
        }).then(() => {
          sessionStorage.setItem('hasVisited', 'true');
        }).catch(err => console.error("Counter error:", err));
      }
  
      return () => unsubscribe();
    }, []);
  
    return count;
}