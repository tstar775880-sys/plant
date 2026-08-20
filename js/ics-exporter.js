/**
 * Plant Hub - ICS Calendar Exporter & Google Maps Navigation Helper
 * Strict adherence to RFC 5545 specification for standard .ics exports.
 */

window.ICSExporter = (function() {

  /**
   * Opens Google Maps Search/Navigation URL for a location
   */
  function openGoogleMaps(locationQuery) {
    if (!locationQuery) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationQuery)}`;
    window.open(url, "_blank");
  }

  /**
   * Helper to format Date string to RFC 5545 format YYYYMMDDTHHmmssZ
   */
  function formatICSDate(dateObj) {
    const pad = (num) => String(num).padStart(2, '0');
    const year = dateObj.getUTCFullYear();
    const month = pad(dateObj.getUTCMonth() + 1);
    const day = pad(dateObj.getUTCDate());
    const hours = pad(dateObj.getUTCHours());
    const minutes = pad(dateObj.getUTCMinutes());
    const seconds = pad(dateObj.getUTCSeconds());
    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
  }

  /**
   * Helper to format Date string YYYY-MM-DD to YYYYMMDD
   */
  function formatICSDateOnly(dateStr) {
    return dateStr.replace(/-/g, '');
  }

  /**
   * Triggers browser download for generated .ics text content
   */
  function downloadICSFile(filename, content) {
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }

  /**
   * Generates .ics file content for scheduled watering tasks
   */
  function exportWateringICS(scheduleItems) {
    if (!scheduleItems || scheduleItems.length === 0) {
      alert("目前尚無可匯出的給水任務！");
      return;
    }

    const nowStr = formatICSDate(new Date());
    let eventsStr = "";

    scheduleItems.forEach(item => {
      const nextDate = item.wateringStatus ? item.wateringStatus.nextWateringDate : item.nextWateringDate;
      if (!nextDate) return;

      const dateCompact = formatICSDateOnly(nextDate);
      const uid = `watering-${item.id}-${dateCompact}@planthub.local`;

      eventsStr += `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${nowStr}
DTSTART;VALUE=DATE:${dateCompact}
SUMMARY:[Plant Hub] 澆水提醒：${item.name} (${item.species})
DESCRIPTION:自訂給水週期：${item.waterInterval} 天\\n上次給水：${item.lastWatered}\\n擺放位置：${item.location || '未指定'}\\n備註：${item.notes || '無'}
LOCATION:${item.location || '家'}
BEGIN:VALARM
TRIGGER:-PT9H
ACTION:DISPLAY
DESCRIPTION:[Plant Hub] 今日待給水提醒
END:VALARM
END:VEVENT
`;
    });

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Plant Hub Taiwan//Plant Care Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Plant Hub 植物給水提醒
${eventsStr}END:VCALENDAR`;

    downloadICSFile(`plant_hub_watering_schedule.ics`, icsContent);
  }

  return {
    openGoogleMaps,
    downloadICSFile,
    exportWateringICS
  };
})();
