import { NextRequest, NextResponse } from 'next/server';
import { connectMongo } from '../../../../../lib/mongo';
import { createAuthenticatedHandler, requireAdminOrExecutive } from '../../../../../lib/middleware/auth';
import ExecutiveService from '../../../../../lib/models/ExecutiveService';

// GET /api/executive-services/executive/[executiveId] - Get services assigned to executive
async function getExecutiveServices(
  request: NextRequest,
  user: any,
  { params }: { params: { executiveId: string } }
) {
  try {
    await connectMongo();
    
    const { executiveId } = params;
    
    const assignedServices = await ExecutiveService.find({
      executiveId,
      isActive: true
    }).select('serviceName assignedAt').lean();
    
    return NextResponse.json({ 
      assignedServices: assignedServices.map(service => ({
        _id: service._id.toString(),
        serviceName: service.serviceName,
        assignedAt: service.assignedAt
      }))
    });

  } catch (error) {
    console.error('Error fetching executive services:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch executive services' 
    }, { status: 500 });
  }
}

export const GET = createAuthenticatedHandler(getExecutiveServices, requireAdminOrExecutive);
