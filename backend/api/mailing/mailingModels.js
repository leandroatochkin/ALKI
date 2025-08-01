export const invitationEmail = (token) => {
    return (
        `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Invitación a Alki</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
    <tr>
      <td style="padding: 30px;">
        <h2 style="color: #333;">¡Te damos la bienvenida a <span style="color: #007BFF;">Alki</span>!</h2>
        <p style="font-size: 16px; color: #555;">
          Fuiste invitado/a a unirte a <strong>Alki</strong>, una plataforma pensada para simplificar la gestión de propiedades y equipos de trabajo.
        </p>
        <p style="font-size: 16px; color: #555;">
          Desde aquí vas a poder organizar tareas, comunicarte con tu equipo, y tener todo bajo control desde un solo lugar.
        </p>
        <p style="font-size: 16px; color: #555;">
          Hacé clic en el botón de abajo para aceptar la invitación y crear tu cuenta:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://alki.com.ar/${token}" target="_blank" style="background-color: #007BFF; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 16px;">Unirme a Alki</a>
        </div>
        <p style="font-size: 14px; color: #999;">
          Si no reconocés esta invitación, simplemente ignorá este mensaje.
        </p>
        <p style="font-size: 14px; color: #999;">
          Saludos,<br />
          El equipo de Alki
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`
    )
}