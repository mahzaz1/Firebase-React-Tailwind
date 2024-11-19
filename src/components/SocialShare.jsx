import React from "react";

function SocialShare() {
  const handleSocialClick = (id) => {};

  return (
    <div className="flex space-x-4 justify-center mt-4">
      <a onClick={() => handleSocialClick()}>
        <img
          className="w-12 p-2 border-2 border-gray-100 rounded-xl hover:border-blue-600 transition"
          src="/facebook_iocn.svg"
          alt=""
        />
      </a>
      <a onClick={() => handleSocialClick()}>
        <img
          className="w-12 p-2 border-2 border-gray-100 rounded-xl hover:border-blue-300 transition"
          src="/twitter_icon.svg"
          alt=""
        />
      </a>
      <a onClick={() => handleSocialClick()}>
        <img
          className="w-12 p-2 border-2 border-gray-100 rounded-xl hover:border-pink-500 transition"
          src="/instagram_icon.svg"
          alt=""
        />
      </a>
      <a onClick={() => handleSocialClick()}>
        <img
          className="w-12 p-2 border-2 border-gray-100 rounded-xl hover:border-purple-500 transition"
          src="/discord_icon.svg"
          alt=""
        />
      </a>
      <a onClick={() => handleSocialClick()}>
        <img
          className="w-12 p-2 border-2 border-gray-100 rounded-xl hover:border-[#0077B5] transition"
          src="/linkedin_icon.svg"
          alt=""
        />
      </a>
      <a onClick={() => handleSocialClick()}>
        <img
          className="w-12 p-2 border-2 border-gray-100 rounded-xl hover:border-red-500 transition"
          src="/youtube_icon.svg"
          alt=""
        />
      </a>
    </div>
  );
}

export default SocialShare;
