import { createRequest } from "@/Helper/request";
import { emailSchema } from "@/Helper/schema";
import { errorTemplate, successTemplate } from "@/utils/apiResponseHTML";
import { NextRequest } from "next/server";

async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  if (!email) {
    return new Response(
      errorTemplate(`Forbidden Resource`, "/", 403, "Return Home"),
      {
        status: 403,
        headers: {
          "Content-Type": "text/html",
        },
      },
    );
  }
  const formValue = emailSchema.safeParse(email);
  console.log("Validation result:", formValue);

  if (!formValue.success) {
    console.error("Email validation failed:", formValue.error);
    return new Response(
      errorTemplate(
        `Invalid Email ${email}`,
        "/forget-password",
        400,
        "Try Again",
      ),
      {
        status: 400,
        headers: {
          "Content-Type": "text/html",
        },
      },
    );
  }

  try {
    const r = await createRequest("POST", "/auth/forget-password", {}, "", {
      email,
    });
    if (r.error || r.status !== 200) {
      return new Response(
        errorTemplate(r.error || "Error", "/", r.status, "Return Home"),
        {
          status: r.status,
          headers: {
            "Content-Type": "text/html",
          },
        },
      );
    }
    return new Response(
      successTemplate("Success Email Sent", "/", 200, "Return Home"),
      {
        status: 200,
        headers: {
          "Content-Type": "text/html",
        },
      },
    );
  } catch (error) {
    console.error("Error sending request:", error);
    return new Response(
      errorTemplate("Server Error", "/", 500, "Return Home"),
      {
        status: 500,
        headers: {
          "Content-Type": "text/html",
        },
      },
    );
  }
}

async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const formObject: { [key: string]: string } = {};

    formData.forEach((value, key) => {
      formObject[key] = value.toString();
    });

    // Validate required fields exist
    if (
      !formObject.token ||
      !formObject.password ||
      !formObject.passwordConfirm
    ) {
      return new Response(
        errorTemplate(
          "Missing required fields Try Again by clicking reset link",
          "/forget-password",
          400,
          "Try Again",
        ),
        {
          status: 400,
          headers: {
            "Content-Type": "text/html",
          },
        },
      );
    }

    // Validate passwords match
    if (formObject.password !== formObject.passwordConfirm) {
      return new Response(
        errorTemplate(
          "Passwords do not match try Again by clicking reset link",
          "/",
          400,
          "Return Home",
        ),
        {
          status: 400,
          headers: {
            "Content-Type": "text/html",
          },
        },
      );
    }

    const validatedData = {
      token: formObject.token,
      password: formObject.password,
      passwordConfirm: formObject.passwordConfirm,
    };

    const r = await createRequest(
      "POST",
      "/auth/reset-password/:token",
      { token: validatedData.token },
      "",
      validatedData,
    );

    if (r.status === 500) {
      console.log(r);
      return new Response(
        errorTemplate("Server Error", "/", r.status, "Return Home"),
        {
          status: 500,
          headers: {
            "Content-Type": "text/html",
          },
        },
      );
    }

    if (r.error || r.status !== 200) {
      return new Response(
        errorTemplate(
          `Error Processing Your Request - ${r.error}`,
          `/auth/reset-password/${validatedData.token}`,
          r.status,
          "Try Again",
        ),
      );
    }

    return new Response(
      successTemplate(
        `Hurray New Password Was set now you can login with new password`,
        "/login",
        200,
        "Return To Login",
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "text/html",
        },
      },
    );
  } catch (error) {
    console.log(error);
    return new Response(
      errorTemplate("Server Error", "/", 500, "Return Home"),
      {
        status: 500,
        headers: {
          "Content-Type": "text/html",
        },
      },
    );
  }
}

export { GET, POST };
