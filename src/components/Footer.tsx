import React from "react";

const Footer = () => {
  return (
    <div class="border-t text-xxs text-footer pt-4 font-thin">
      <div>
        <span> Copyright © 2020 Boclips. All rights reserved. </span>
        <span class="pl-6">
          <a
            rel="noopener noreferrer"
            class="text-primary-link"
            href="https://www.boclips.com/terms-and-conditions"
            target="_blank"
          >
            Terms &amp; Conditions
          </a>
          &nbsp;•&nbsp;
          <a
            rel="noopener noreferrer"
            class="text-primary-link"
            href="https://www.boclips.com/privacy-policy"
            target="_blank"
          >
            Privacy Policy
          </a>
        </span>
      </div>
      <div>
        <p>
          All trademarks, service marks, trade names, product names and logos
          appearing on the site are the property of their respective owners. Any
          rights not expressly granted herein are reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer
