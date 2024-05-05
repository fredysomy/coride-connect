import React, { useState } from 'react';
import Suggestion from '../components/Suggestion';

export default function HomePage() {
  
  return (
    <div className="flex flex-col space-y-4 pt-4">
    <div><Suggestion /></div> 
    <div><Suggestion /></div> 
    <div><Suggestion /></div> 
  
    </div>
  );
}
