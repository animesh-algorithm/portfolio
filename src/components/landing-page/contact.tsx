import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { SocialIcon } from "react-social-icons";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const Contact = () => {
  return (
    <div
      id="contact"
      className="overflow-hidden px-4 sm:px-6 mt-10 sm:flex sm:flex-col gap-4 md:justify-center md:items-center"
    >
      <Card className="bg-background">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Get in touch</CardTitle>
          <CardDescription>
            This contact form is a no-go, but the one I'll whip up for you will
            work for sure.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex flex-row items-center justify-center w-full space-x-1">
            <SocialIcon
              url="https://www.linkedin.com/in/animesh-algorithm/"
              bgColor="#030014"
              fgColor="#ffffff"
              style={{ height: 40, width: 40 }}
            />
            <SocialIcon
              url="https://www.instagram.com/animesh.algorithm"
              bgColor="#030014"
              fgColor="#ffffff"
              style={{ height: 40, width: 40 }}
            />
            <SocialIcon
              url="https://www.twitter.com/animesh_algo"
              bgColor="#030014"
              fgColor="#ffffff"
              style={{ height: 40, width: 40 }}
            />
            <SocialIcon
              url="mailto:animesharma3@gmail.com"
              bgColor="#030014"
              fgColor="#ffffff"
              style={{ height: 40, width: 40 }}
            />
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fname">First Name</Label>
              <Input id="fname" placeholder="John" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lname">Last Name</Label>
              <Input id="lname" placeholder="Wick" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="area">Interested In?</Label>
            <Select defaultValue="Purpose">
              <SelectTrigger id="area">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Purpose">
                  Select the purpose of contact
                </SelectItem>
                <SelectItem value="Hiring">Hiring</SelectItem>
                <SelectItem value="Freelancing">Freelancing</SelectItem>
                <SelectItem value="Collaboration">Collaboration</SelectItem>
                <SelectItem value="Feedback">Feedback</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="What's the subject of your message?"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="What's on your mind? Feel free to share your thoughts."
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Contact;
