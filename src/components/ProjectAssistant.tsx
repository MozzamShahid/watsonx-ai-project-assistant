import React, { useState } from 'react';

export default function ProjectAssistant() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleQuerySubmit = async () => {
    // Simulated API Call
    const simulatedResponse = `Simulated response for query: ${query}`;
    setResponse(simulatedResponse);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Project Assistant</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your query"
        className="w-full border px-4 py-2 mb-4"
      />
      <button
        onClick={handleQuerySubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
      {response && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h2 className="font-bold">Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
