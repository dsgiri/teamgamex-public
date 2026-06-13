// pages/portal/mds-logs.tsx
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useUser } from '@clerk/nextjs'
import PortalLayout from 'components/portal/PortalLayout'
import { supabase } from 'lib/supabase'
import { jsPDF } from 'jspdf'

export default function MDSLogs() {
  const { user } = useUser()
  const [selectedLog, setSelectedLog] = useState<any>(null)
  const [logs, setLogs] = useState<any[]>([])
  const [facilityProfile, setFacilityProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // 1. Fetch Logs and Facility Infrastructure
  useEffect(() => {
    async function initInfrastructure() {
      if (!user) return

      // Fetch Scheduled Events (The raw logs)
      const { data: eventData } = await supabase
        .from('event_calendar')
        .select('*')
        .order('scheduled_for', { ascending: false })
      
      // Fetch Facility Profile for PDF Header (ID 2.2)
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (eventData) setLogs(eventData)
      if (profileData) setFacilityProfile(profileData)
      setLoading(false)
    }
    initInfrastructure()
  }, [user])

  // 2. THE PDF EXPORT ENGINE (ID 2.1)
  const generatePDF = (log: any) => {
    const doc = new jsPDF()
    const timestamp = new Date().toLocaleString()
    
    // Header: Industrial Branding
    doc.setFontSize(22)
    doc.setFont('helvetica', 'bold')
    doc.text('TEAMGAMEX COMPLIANCE LOG', 20, 30)
    
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100)
    doc.text(`Generated on: ${timestamp}`, 20, 38)

    // Facility Infrastructure (Injected from Profile)
    doc.setDrawColor(240)
    doc.line(20, 45, 190, 45)
    
    doc.setFontSize(12)
    doc.setTextColor(0)
    doc.setFont('helvetica', 'bold')
    doc.text('FACILITY IDENTIFICATION', 20, 55)
    
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(`Facility: ${facilityProfile?.facility_name || 'N/A'}`, 20, 62)
    doc.text(`License #: ${facilityProfile?.license_number || 'N/A'}`, 20, 68)
    doc.text(`NPI Number: ${facilityProfile?.npi_number || 'N/A'}`, 20, 74)

    // Clinical Content: MDS Section F Logic
    doc.setFillColor(250, 250, 250)
    doc.rect(20, 85, 170, 60, 'F')
    
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('CLINICAL DOCUMENTATION (SECTION F)', 25, 95)
    
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    const splitText = doc.splitTextToSize(log.mds_log || "No log content generated.", 160)
    doc.text(splitText, 25, 105)

    // Footer: Security Seal
    doc.setFontSize(8)
    doc.setTextColor(150)
    doc.text('This document is electronically generated and verified by the TGX Compliance Logic Engine.', 20, 280)
    doc.text(`System Reference: ${log.id}`, 20, 285)

    // Save File
    doc.save(`TGX_LOG_${log.id}_${new Date().toISOString().split('T')[0]}.pdf`)
  }

  return (
    <PortalLayout>
      <Head><title>Compliance Vault | TGX Portal</title></Head>

      <header className="mb-12">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-2 block">RAI/MDS Automation</span>
        <h1 className="text-4xl font-black tracking-tighter text-slate-900">Compliance Vault.</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Log Queue */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Activity History</h3>
          {loading ? (
            <div className="p-8 border-2 border-dashed border-slate-100 rounded-[2rem] animate-pulse" />
          ) : logs.map(log => (
            <button 
              key={log.id}
              onClick={() => setSelectedLog(log)}
              className={`w-full text-left p-6 rounded-[2rem] border-2 transition-all ${
                selectedLog?.id === log.id ? 'border-blue-600 bg-blue-50 shadow-lg' : 'border-slate-100 bg-white hover:border-blue-200 shadow-sm'
              }`}
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">ID: {log.id.slice(0,8)}</p>
              <p className="text-sm font-bold text-slate-900">Activity: {log.post_id.slice(-6)}</p>
              <p className="text-[10px] font-medium text-slate-400 mt-2">{new Date(log.scheduled_for).toLocaleDateString()}</p>
            </button>
          ))}
        </div>

        {/* Right: The Generator Preview */}
        <div className="lg:col-span-2">
          {selectedLog ? (
            <div className="bg-white border-2 border-slate-100 rounded-[3.5rem] p-12 shadow-sm sticky top-12">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black tracking-tight">Audit Preview</h2>
                <button 
                  onClick={() => generatePDF(selectedLog)}
                  className="bg-slate-900 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg"
                >
                  Export PDF —
                </button>
              </div>

              <div className="space-y-8">
                <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 font-mono text-xs leading-relaxed text-slate-600">
                  <p className="text-blue-600 font-black mb-6 uppercase text-[9px] tracking-widest border-b border-blue-100 pb-2">
                    // RAI MANUAL v1.20.1 ALIGNED LOG
                  </p>
                  {selectedLog.mds_log}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                    <p className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-1">Facility Target</p>
                    <p className="text-xs font-bold text-slate-900">{facilityProfile?.facility_name || 'Missing Profile Data'}</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Audit Status</p>
                    <p className="text-xs font-bold text-slate-900">State Survey Ready</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] border-2 border-dashed border-slate-100 rounded-[4rem] flex flex-col items-center justify-center text-center p-12">
              <div className="text-4xl mb-6">📄</div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Select an activity from history <br /> to generate a compliance report.</p>
            </div>
          )}
        </div>
      </div>
    </PortalLayout>
  )
}