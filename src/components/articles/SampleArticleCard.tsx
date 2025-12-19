import React from "react";
import { PLACEHOLDER } from "../../data/defaultArticles";

const SampleArticleCard: React.FC = () => {
  return (
    <section className="lg:col-span-3 max-w-3xl mx-auto mt-6">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow overflow-hidden">
        {/* Image on the left */}
        <div className="md:w-1/3">
          <img
            src={PLACEHOLDER}
            alt="Sample article"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content on the right */}
        <div className="md:w-2/3 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 hover:underline">
              Example Article Title
            </h2>
            <p className="mt-2 text-gray-600 text-sm">
              This is a short excerpt or description of the article. It gives readers
              a preview of the content and encourages them to click through.
            </p>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SampleArticleCard;
