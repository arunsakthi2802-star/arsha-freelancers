import React from "react";
import { Code, FileText, ExternalLink, History, Calendar, Lock } from "lucide-react";

export default function DashboardProjects({ projects }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="glass-card rounded-[2rem] p-12 text-center border border-border-primary flex flex-col items-center justify-center min-h-[400px]">
        <FileText className="w-12 h-12 text-text-tertiary mb-4 opacity-50" />
        <h3 className="text-lg font-bold text-text-primary mb-2">No Projects Found</h3>
        <p className="text-sm text-text-secondary max-w-sm mx-auto">
          You don't have any active projects yet. When you request a project, it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {projects.map((p) => (
        <div key={p._id} className="glass-card rounded-[2rem] p-6 sm:p-10 border border-border-primary overflow-hidden relative">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 border-b border-border-primary pb-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">{p.title}</h3>
                <span className="px-3 py-1 bg-accent-primary/10 text-accent-primary text-[10px] rounded-full uppercase tracking-widest font-bold border border-accent-primary/20">
                  {p.projectType || "Project"}
                </span>
              </div>
              {p.description && <p className="text-sm text-text-secondary leading-relaxed">{p.description}</p>}
            </div>
            
            <div className="flex flex-col lg:items-end gap-3 shrink-0 w-full lg:w-auto">
              <span className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest ${
                p.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
              }`}>
                {p.status || "In Progress"}
              </span>
              <div className="flex items-center gap-2 text-xs font-bold text-text-tertiary">
                <Calendar className="w-4 h-4" /> 
                Deadline: {p.deadline ? new Date(p.deadline).toLocaleDateString() : 'TBD'}
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-10">
            <div className="flex justify-between items-end mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-text-tertiary">Overall Progress</span>
              <span className="text-2xl font-black text-accent-primary">{p.completionPercentage || 0}%</span>
            </div>
            <div className="w-full bg-bg-secondary rounded-full h-4 border border-border-primary overflow-hidden">
              <div 
                className="bg-accent-primary h-full rounded-full transition-all duration-1000 ease-out relative" 
                style={{ width: `${p.completionPercentage || 0}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 p-6 bg-bg-secondary rounded-2xl border border-border-primary">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-tertiary mb-3">
                <Code className="w-4 h-4" /> Technologies
              </div>
              <div className="flex flex-wrap gap-2">
                {p.technology && p.technology.length > 0 ? (
                  p.technology.map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 bg-bg-primary border border-border-primary rounded-lg text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                      {tech}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-text-tertiary italic">None specified</span>
                )}
              </div>
            </div>
          </div>

          {/* Two Columns: Resources & Updates */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Resources */}
            <div>
              <h4 className="text-sm font-black text-text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
                <FileText className="w-4 h-4 text-accent-primary" /> Project Resources
              </h4>
              <div className="space-y-3">
                {p.files && p.files.length > 0 ? (
                  p.files.map((file, i) => (
                    file.isUnlocked !== false ? (
                      <a 
                        key={i} 
                        href={file.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-between p-4 rounded-xl border border-border-primary bg-bg-secondary hover:border-accent-primary hover:shadow-md transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 bg-bg-primary rounded-lg border border-border-primary group-hover:border-accent-primary/50 transition-colors">
                            <FileText className="w-4 h-4 text-text-secondary group-hover:text-accent-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-text-primary">{file.title}</p>
                            <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider">{file.fileType?.replace("_", " ")}</p>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-text-tertiary group-hover:text-accent-primary transition-colors" />
                      </a>
                    ) : (
                      <div 
                        key={i} 
                        className="flex items-center justify-between p-4 rounded-xl border border-border-primary bg-bg-secondary opacity-60 cursor-not-allowed"
                        title="Locked (Unlocks on milestone completion)"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 bg-bg-primary rounded-lg border border-border-primary">
                            <Lock className="w-4 h-4 text-text-tertiary" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-text-primary flex items-center gap-2">
                              {file.title} 
                              <span className="text-[9px] bg-rose-500/10 text-rose-500 px-2 py-0.5 rounded-md font-black tracking-widest uppercase border border-rose-500/20">Locked</span>
                            </p>
                            <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider">{file.fileType?.replace("_", " ")}</p>
                          </div>
                        </div>
                      </div>
                    )
                  ))
                ) : (
                  <div className="p-6 text-center bg-bg-secondary rounded-xl border border-border-primary border-dashed">
                    <p className="text-xs font-bold text-text-tertiary uppercase tracking-widest">No resources uploaded yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Updates */}
            <div>
              <h4 className="text-sm font-black text-text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
                <History className="w-4 h-4 text-purple-500" /> Recent Updates
              </h4>
              <div className="relative before:absolute before:inset-0 before:ml-[11px] before:w-px before:bg-border-primary pl-8 space-y-6">
                {p.versionHistory && p.versionHistory.length > 0 ? (
                  p.versionHistory.slice(-3).reverse().map((vh, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[37px] w-2.5 h-2.5 bg-purple-500 rounded-full border-[3px] border-bg-primary shadow-sm mt-1.5" />
                      <div className="bg-bg-secondary p-4 rounded-xl border border-border-primary shadow-sm">
                        <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                          <span className="font-bold text-sm text-text-primary">{vh.version}</span>
                          <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest bg-bg-primary px-2 py-1 rounded-md border border-border-primary">
                            {new Date(vh.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary leading-relaxed font-medium">{vh.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs font-bold text-text-tertiary uppercase tracking-widest bg-bg-secondary p-6 text-center rounded-xl border border-border-primary border-dashed">
                    No status updates available
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}
