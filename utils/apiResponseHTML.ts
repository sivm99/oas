function errorTemplate(
  title: string,
  link: string,
  status: number,
  hint: string,
) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>One Alias Service ${status}</title>
      <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M12 2L1 21h22L12 2z'/><path d='M12 8v6'/><path d='M12 17v.01'/></svg>">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <style>
        /* Global Styles */
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 0;
        }

        /* Container: Center content */
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f3f4f6;
          transition: background-color 0.3s ease;
        }

        /* Dark Mode */
        @media (prefers-color-scheme: dark) {
          .container {
            background-color: #1f2937; /* Dark background */
          }
        }

        /* Card: Centered content with shadow */
        .card {
          padding: 2rem;
          background-color: white;
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          width: 100%;
          text-align: center;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        /* Dark Mode Card */
        @media (prefers-color-scheme: dark) {
          .card {
            background-color: #374151; /* Dark card */
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
          }
        }

        /* Error Title: Bold and standout */
        .error-title {
          font-size: 2rem;
          font-weight: bold;
          color: #dc2626; /* Red for error */
          margin-bottom: 1rem;
          transition: color 0.3s ease;
        }

        /* Dark Mode Error Title */
        @media (prefers-color-scheme: dark) {
          .error-title {
            color: #f87171; /* Lighter red for dark mode */
          }
        }

        /* Error Message: Slightly smaller and more subtle */
        .error-message {
          color: #374151;
          margin-bottom: 1.5rem;
          font-size: 1.125rem;
          line-height: 1.6;
          transition: color 0.3s ease;
        }

        /* Dark Mode Error Message */
        @media (prefers-color-scheme: dark) {
          .error-message {
            color: #e5e7eb; /* Light text for dark mode */
          }
        }

        /* Home Link: Button-style link */
        .home-link {
          padding: 0.75rem 1.5rem;
          background-color: #3b82f6; /* Blue for action */
          color: white;
          border-radius: 0.375rem;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 600;
          display: inline-block;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }

        /* Hover Effect for Home Link */
        .home-link:hover {
          background-color: #2563eb; /* Darker blue on hover */
          transform: translateY(-2px);
        }

        /* Dark Mode Home Link */
        @media (prefers-color-scheme: dark) {
          .home-link {
            background-color: #60a5fa; /* Lighter blue for dark mode */
          }
          .home-link:hover {
            background-color: #3b82f6; /* Darker blue on hover */
          }
        }

        /* Favicon */
        link[rel="icon"] {
          width: 24px;
          height: 24px;
        }
      </style>

    </head>
    <body>
      <div class="container">
        <div class="card">
          <h2 class="error-title">Error ${status}</h2>
          <p class="error-message">${title}</p>
          <a href="${link}" class="home-link">${hint}</a>
        </div>
      </div>
    </body>
  </html>`;
}

function successTemplate(
  title: string,
  link: string,
  status: number,
  hint: string,
) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>One Alias Service ${status}</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M12 2L1 21h22L12 2z'/><path d='M12 8v6'/><path d='M12 17v.01'/></svg>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
      /* Global Styles */
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
      }

      /* Container: Center content */
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background-color: #e5f7e8; /* Light green for success */
        transition: background-color 0.3s ease;
      }

      /* Dark Mode */
      @media (prefers-color-scheme: dark) {
        .container {
          background-color: #1c2530; /* Dark background */
        }
      }

      /* Card: Centered content with shadow */
      .card {
        padding: 2rem;
        background-color: white;
        border-radius: 0.75rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        max-width: 500px;
        width: 100%;
        text-align: center;
        transition: background-color 0.3s ease, box-shadow 0.3s ease;
      }

      /* Dark Mode Card */
      @media (prefers-color-scheme: dark) {
        .card {
          background-color: #253347; /* Dark card */
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
        }
      }

      /* Success Title: Bold and standout */
      .success-title {
        font-size: 2rem;
        font-weight: bold;
        color: #16a34a; /* Green for success */
        margin-bottom: 1rem;
        transition: color 0.3s ease;
      }

      /* Dark Mode Success Title */
      @media (prefers-color-scheme: dark) {
        .success-title {
          color: #34d399; /* Lighter green for dark mode */
        }
      }

      /* Success Message: Slightly smaller and more subtle */
      .success-message {
        color: #374151;
        margin-bottom: 1.5rem;
        font-size: 1.125rem;
        line-height: 1.6;
        transition: color 0.3s ease;
      }

      /* Dark Mode Success Message */
      @media (prefers-color-scheme: dark) {
        .success-message {
          color: #d1d5db; /* Light text for dark mode */
        }
      }

      /* Countdown Message */
      .countdown {
        font-size: 1rem;
        font-weight: bold;
        color: #4b5563;
        margin-bottom: 1.5rem;
        transition: color 0.3s ease;
      }

      /* Dark Mode Countdown */
      @media (prefers-color-scheme: dark) {
        .countdown {
          color: #e5e7eb;
        }
      }

      /* Redirect Link */
      .redirect-link {
        padding: 0.75rem 1.5rem;
        background-color: #10b981; /* Teal for redirect button */
        color: white;
        border-radius: 0.375rem;
        text-decoration: none;
        font-size: 1rem;
        font-weight: 600;
        display: inline-block;
        transition: background-color 0.2s ease, transform 0.2s ease;
      }

      /* Hover Effect for Redirect Link */
      .redirect-link:hover {
        background-color: #059669; /* Darker teal on hover */
        transform: translateY(-2px);
      }

      /* Dark Mode Redirect Link */
      @media (prefers-color-scheme: dark) {
        .redirect-link {
          background-color: #6ee7b7; /* Lighter teal for dark mode */
        }
        .redirect-link:hover {
          background-color: #10b981;
        }
      }

    </style>
  </head>
  <body>
    <div class="container">
      <div class="card">
        <h2 class="success-title">${hint}</h2>
        <p class="success-message">${title}</p>
        <p class="countdown">Redirecting in <span id="countdown">5</span> seconds...</p>
        <a href="${link}" class="redirect-link">Continue</a>
      </div>
    </div>

    <script>
      // Countdown Script
      let countdown = 5;
      const countdownElement = document.getElementById('countdown');
      const redirectLink = document.querySelector('.redirect-link').href;

      const countdownInterval = setInterval(() => {
        countdown -= 1;
        countdownElement.textContent = countdown;

        if (countdown <= 0) {
          clearInterval(countdownInterval);
          window.location.href = redirectLink;
        }
      }, 1000);
    </script>
  </body>
  </html>`;
}

export { errorTemplate, successTemplate };
