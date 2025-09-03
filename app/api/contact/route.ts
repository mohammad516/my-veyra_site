import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// GET handler for testing API connectivity
export async function GET() {
  return NextResponse.json({ message: "Contact API is working" });
}

export async function POST(request: NextRequest) {
  console.log('Contact API route called');
  
  try {
    const { name, email, message } = await request.json();
    console.log('Request body parsed:', { name, email, message: message?.substring(0, 50) + '...' });

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if RESEND_API_KEY is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { 
          error: 'Email service is not configured. Please set RESEND_API_KEY in your .env.local file.',
          setupRequired: true
        },
        { status: 500 }
      );
    }

    console.log('RESEND_API_KEY found, initializing Resend...');
    
    // Initialize Resend only if API key is available
    const resend = new Resend(process.env.RESEND_API_KEY);

    console.log('Attempting to send email via Resend...');

         // Send email using Resend
     const { data, error } = await resend.emails.send({
       from: 'onboarding@resend.dev',
       to: ['veyra0047@gmail.com'],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #007bff; margin-top: 0;">Contact Details</h3>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #555;">Name:</strong>
              <span style="color: #333; margin-left: 10px;">${name}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #555;">Email:</strong>
              <span style="color: #333; margin-left: 10px;">${email}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #555;">Message:</strong>
              <div style="color: #333; margin-top: 10px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #007bff; border-radius: 4px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
              <p>This message was sent from your website's contact form.</p>
              <p>Time: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Message: ${message}

Time: ${new Date().toLocaleString()}
      `,
    });

    if (error) {
      console.error('Resend API error details:', error);
      return NextResponse.json(
        { 
          error: 'Failed to send email',
          details: error.message || 'Unknown Resend API error'
        },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);
    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
