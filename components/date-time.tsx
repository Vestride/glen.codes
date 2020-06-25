interface DateTimeProps {
  date: string;
}

export const DateTime: React.FunctionComponent<DateTimeProps> = ({ date }) => (
  <time dateTime={date} itemProp="datePublished">
    {new Date(date).toLocaleString(undefined, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })}
  </time>
);
