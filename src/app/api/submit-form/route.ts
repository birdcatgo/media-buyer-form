import { google } from 'googleapis'

export async function POST(request: Request) {
  try {
    const formData = await request.json()
    console.log('Received form data:', formData)

    // Format data for Google Sheets
    const row = [
      new Date().toISOString(),
      formData.contactName,
      formData.contactEmail,
      formData.telegramId,
      formData.skypeId,
      formData.selectedVerticals.join(', '),
      formData.selectedLeadVerticals.join(', '),
      formData.otherLeadVertical || '',
      formData.selectedNetworks.join(', '),
      formData.selectedNetworks.map(network => 
        network === 'Other' 
          ? `${formData.otherPlatform}: ${formData.spendRanges[network]}`
          : `${network}: ${formData.spendRanges[network]}`
      ).join('; '),
      formData.monthlySpend,
      formData.averageRoas,
      formData.teamSize,
      formData.profitShare
    ]

    console.log('Formatted row data:', row)

    // Send to Google Sheets
    const sheets = google.sheets({ 
      version: 'v4', 
      auth: new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
      })
    })

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:N',
      valueInputOption: 'RAW',
      requestBody: {
        values: [row]
      }
    })

    return Response.json({ 
      success: true, 
      message: 'Form submitted successfully'
    })
  } catch (error) {
    console.error('Form submission error:', error)
    return Response.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to submit form'
      },
      { status: 500 }
    )
  }
}