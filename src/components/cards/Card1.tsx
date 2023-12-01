import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type props = {
  title: React.ReactNode | string,
  titleDescription: React.ReactNode | string,
  content: React.ReactNode | string,
  footer: React.ReactNode | string
}

function Card1(props: props) {
  const { title, titleDescription, content, footer } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {title}
        </CardTitle>
        <CardDescription>
          {titleDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {content}
      </CardContent>
      <CardFooter>
        {footer}
      </CardFooter>
    </Card>
  )
}

export default Card1