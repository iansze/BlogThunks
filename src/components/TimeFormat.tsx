import { parseISO, formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

type TimeFormatProps = {
  timestamp: string;
};

const TimeFormat = ({ timestamp }: TimeFormatProps) => {
  const [timePeriod, setTimePeriod] = useState("");

  useEffect(() => {
    if (timestamp) {
      const date = parseISO(timestamp);
      const timePeriod = formatDistanceToNow(date);
      setTimePeriod(timePeriod);
    }
  }, [timestamp]);

  return (
    <span title={timestamp}>
      <i>{`${timePeriod} ago`}</i>
    </span>
  );
};

export default TimeFormat;
