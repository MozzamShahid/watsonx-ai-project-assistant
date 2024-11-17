export function UserMessage({ content }: { content: string }) {
    return (
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center">
          U
        </div>
        <div className="bg-blue-100 rounded-lg p-3 max-w-[80%]">
          <p className="text-sm">{content}</p>
        </div>
      </div>
    );
  }
  