import React, { useState } from "react";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDatabase,
  faWindowMaximize,
  faCube,
  faClock,
  faPaperPlane,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import E_com_head from "./e_com_head";

// 👇 Categories for tabs
const categories = ["Daily", "Monthly", "Yearly"];

// 👇 Stats data for ContactCard
const stats = [
  { label: "Leads Generated", value: "2,176", change: +11 },
  { label: "Deals Closed", value: "2,027", change: 2 },
  { label: "Meetings Scheduled", value: "342", change: -4 },
];

// 👇 Team members list
const members = [
  {
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "Julia Roberts",
    email: "julia@gmail.com",
    role: "Coordinator",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Cate Blanchett",
    email: "cate@gmail.com",
    role: "Project Manager",
  },
   {
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Jennifer Lawrence",
    email: "jennifer@gmail.com",
    role: "CRM Admin",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    name: "Tom Hanks",
    email: "tom@gmail.com",
    role: "Product Manager",
  },
  {
    avatar:"https://image.tmdb.org/t/p/original/cMwXD3eiUfStgVh1gpVcwCnNelv.jpg",
    name: "Tom Cruise",
    email: "tomcruise@gmail.com",
    role: "Product Manager",
  },
];

// 👇 Shared files data
const files = [
  {
    thumbnail:
      "https://thumbs.dreamstime.com/z/group-discussion-top-view-diverse-people-meeting-table-office-setting-communicating-gesturing-248386037.jpg?ct=jpeg",
    title: "Email Campaign ",
    link: "http://left4code.com/1",
    members: "4+",
  },
  {
    thumbnail:
      "https://www.rivaliq.com/wp-content/uploads/2019/07/Social-media-team-1536x1025.jpg",
    title: "Social Analytics",
    link: "http://left4code.com/2",
    members: "4+",
  },
  {
    thumbnail:
      "https://static.vecteezy.com/system/resources/previews/032/168/361/non_2x/corporate-office-discussion-teamwork-administration-team-brainstorming-meeting-businessmen-group-laptop-indoors-top-cooperation-business-view-photo.jpg",
    title: "Sales Deck",
    link: "http://left4code.com/3",
    members: "4+",
  },
  {
    thumbnail:
      "https://th.bing.com/th/id/OIP.k7XFSPAi4te0mEcqyoxu9QHaE8?rs=1&pid=ImgDetMain",
    title: "Marketing Poster",
    link: "http://left4code.com/4",
    members: "4+",
  },
];

// 📦 ContactCard Component
const ContactCard = ({ img, name, role, imp, stats }) => (
  <div className="bg-neutral-900 p-4 rounded-xl text-white shadow">
    <div className="flex items-center justify-between border-b pb-3 mb-3 border-dashed border-neutral-700">
      <div className="flex items-center gap-3">
        <img className="w-12 h-12 rounded-full border" src={img} alt={name} />
        <div>
          <div>{name}</div>
          <div className="text-slate-400">{role}</div>
        </div>
      </div>
      <div className="bg-green-900 text-green-100 px-3 py-1 rounded-full text-sm">
        {imp}
      </div>
    </div>

    <div className="grid grid-cols-3 gap-3 text-center">
      {stats.map((item, idx) => (
        <div key={idx}>
          <div className="text-slate-400 text-sm">{item.label}</div>
          <div className="font-bold">{item.value}</div>
          <div className={item.change >= 0 ? "text-green-500" : "text-red-500"}>
            {Math.abs(item.change)}%
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 📦 CollaborationCard
const CollaborationCard = ({
  kickoffDate,
  projectName,
  title,
  post,
  titleImg,
  head,
  headName,
  headImg,
}) => (
  <div className="bg-neutral-900 text-white p-4 rounded-xl">
    <div className="text-slate-400 text-sm mb-2">Collaboration Report</div>
    <div className="bg-emerald-900 text-emerald-100 text-sm p-2 rounded mb-3">
      <FontAwesomeIcon icon={faClock} className="mr-2" />
      Kick-off: <strong>{kickoffDate}</strong>
    </div>
    <div className="space-y-2 text-sm">
      <div>
        Project Name: <strong>{projectName}</strong>
      </div>
      <div className="flex items-center gap-2">
        {title}: <img className="w-6 h-6 rounded-full" src={titleImg} />
        <span className="underline">{post}</span>
      </div>
      <div className="flex items-center gap-2">
        {head}: <img className="w-6 h-6 rounded-full" src={headImg} />
        <span className="underline">{headName}</span>
      </div>
    </div>
  </div>
);

// 📦 MembersList
const MembersList = ({ members }) => {
  const [copied, setCopied] = useState(false);
  const invitationURL = "https://left4code.com/invitation?token=abc123";

  const handleCopy = () => {
    navigator.clipboard.writeText(invitationURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
 

  
  return (
    <div className="bg-neutral-900 text-white p-4 rounded-xl">
      <p className="mb-3">Invite Members</p>

      <div className="flex gap-2 mb-4">
        <input
          placeholder="Enter email"
          className="bg-neutral-800 p-2 rounded w-full"
        />
        <button className="bg-blue-600 px-4 py-2 rounded">
          <FontAwesomeIcon icon={faPaperPlane} /> Send
        </button>
      </div>

      {members.map((m, idx) => (
        <div key={idx} className="flex items-center justify-between py-2 border-b border-dashed border-neutral-700">
          <div className="flex items-center gap-3">
            <img src={m.avatar} className="w-10 h-10 rounded-full" />
            <div>
              <div>{m.name}</div>
              <div className="text-slate-400 text-sm">{m.email}</div>
            </div>
          </div>
          <div className="bg-neutral-700 px-3 py-1 rounded text-sm">{m.role}</div>
        </div>
      ))}

      <div className="mt-4">
        <label className="text-sm text-slate-400 mb-1 block">Share Link</label>
        <div className="flex">
          <input
            value={invitationURL}
            readOnly
            className="bg-neutral-800 px-3 py-2 w-full rounded-l text-sm"
          />
          <button
            onClick={handleCopy}
            className="bg-neutral-700 px-4 rounded-r"
          >
            <FontAwesomeIcon icon={faCopy} />
          </button>
        </div>
        {copied && <div className="text-green-400 text-sm mt-1">Copied!</div>}
      </div>
    </div>
  );
};

// 📦 FileItem + FilesList
const FileItem = ({ thumbnail, title, link, members }) => (
  <div className="border border-neutral-700 p-3 rounded-lg flex gap-4">
    <img src={thumbnail} className="w-32 h-20 rounded object-cover" />
    <div>
      <div className="font-bold">{title}</div>
      <a href={link} className="text-blue-400 text-sm underline">
        {link}
      </a>
      <div className="text-slate-400 text-sm">{members} Members</div>
    </div>
  </div>
);

const FilesList = ({ files }) => (
  <div className="bg-neutral-900 text-white p-4 rounded-xl space-y-3">
    <p className="text-lg mb-2">Shared Files</p>
    {files.map((f, idx) => (
      <FileItem key={idx} {...f} />
    ))}
  </div>
);

// ✅ Main Dashboard Component
function Dashboard() {
  return (
    <div className="container mx-auto px-4">
      {/* Tabs Section */}
      <div className="py-4">
        <TabGroup>
          <TabList className="flex gap-2 bg-blue-200 p-2 rounded">
            {categories.map((name) => (
              <Tab
                key={name}
                className="px-6 py-2 rounded-md text-sm font-semibold data-selected:bg-blue-500/20"
              >
                {name}
              </Tab>
            ))}
          </TabList>
        </TabGroup>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <E_com_head icon={faDatabase} num="247,220" per="3%" title="Customer Engagement" />
        <E_com_head icon={faWindowMaximize} num="124,625" per="3%" title="Lead Generation" />
        <E_com_head icon={faCube} num="749,220" per="4%" title="Support Tickets" />
        <E_com_head icon={faWindowMaximize} num="289,235" per="9%" title="Pipeline Management" />
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ContactCard
          img="https://randomuser.me/api/portraits/women/11.jpg"
          name="Meryl Streep"
          role="HR Director"
          imp="High Priority"
          stats={stats}
        />

        <CollaborationCard
          kickoffDate="18 December 2021"
          projectName="Productivity Pioneers"
          title="Project Manager"
          post="Jennifer Lawrence"
          head="Creative Director"
          headName="Meryl Streep"
          titleImg="https://randomuser.me/api/portraits/women/8.jpg"
          headImg="https://randomuser.me/api/portraits/women/11.jpg"
        />

        <MembersList members={members} />
        <FilesList files={files} />
      </div>
    </div>
  );
}

export default Dashboard;
