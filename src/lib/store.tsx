'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Destination,
  Package,
  Hotel,
  Enquiry,
  BookingOrder,
  WebsiteSettings,
  EnquiryStatus,
  OrderStatus,
  PaymentStatus
} from './types';
import {
  initialDestinations,
  initialPackages,
  initialHotels,
  initialEnquiries,
  initialOrders,
  initialSettings
} from './data';

interface TravelStoreContextType {
  destinations: Destination[];
  packages: Package[];
  hotels: Hotel[];
  enquiries: Enquiry[];
  orders: BookingOrder[];
  settings: WebsiteSettings;
  currency: string;
  setCurrency: (currency: string) => void;
  savedPackageIds: string[];
  toggleSavePackage: (packageId: string) => void;
  isPackageSaved: (packageId: string) => boolean;
  // Admin actions
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'referenceId' | 'createdAt' | 'status'>) => Enquiry;
  updateEnquiryStatus: (enquiryId: string, status: EnquiryStatus, note?: string) => void;
  assignEnquiryAgent: (enquiryId: string, agent: string) => void;
  addBookingOrder: (order: Omit<BookingOrder, 'id' | 'orderReference' | 'createdAt'>) => BookingOrder;
  updateOrderStatus: (orderId: string, orderStatus: OrderStatus, notes?: string) => void;
  updatePaymentStatus: (orderId: string, paymentStatus: PaymentStatus, notes?: string) => void;
  addPackage: (newPackage: Package) => void;
  updatePackage: (packageId: string, updated: Partial<Package>) => void;
  deletePackage: (packageId: string) => void;
  addHotel: (newHotel: Hotel) => void;
  updateHotel: (hotelId: string, updated: Partial<Hotel>) => void;
  updateDestination: (destinationId: string, updated: Partial<Destination>) => void;
  updateSettings: (updated: Partial<WebsiteSettings>) => void;
  activeRole: 'Super Admin' | 'Content Manager' | 'Sales Concierge' | 'Finance Officer';
  setActiveRole: (role: 'Super Admin' | 'Content Manager' | 'Sales Concierge' | 'Finance Officer') => void;
}

const TravelStoreContext = createContext<TravelStoreContextType | null>(null);

const STORAGE_KEY = 'arab_and_beyond_store_v7';

export function TravelStoreProvider({ children }: { children: React.ReactNode }) {
  const [destinations, setDestinations] = useState<Destination[]>(initialDestinations);
  const [packages, setPackages] = useState<Package[]>(initialPackages);
  const [hotels, setHotels] = useState<Hotel[]>(initialHotels);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [orders, setOrders] = useState<BookingOrder[]>(initialOrders);
  const [settings, setSettings] = useState<WebsiteSettings>(initialSettings);
  const [currency, setCurrency] = useState<string>('GBP');
  const [savedPackageIds, setSavedPackageIds] = useState<string[]>([]);
  const [activeRole, setActiveRole] = useState<'Super Admin' | 'Content Manager' | 'Sales Concierge' | 'Finance Officer'>('Super Admin');
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage if present and valid
  useEffect(() => {
    try {
      // Purge legacy storage versions
      localStorage.removeItem('arab_and_beyond_store_v1');
      localStorage.removeItem('arab_and_beyond_store_v2');
      localStorage.removeItem('arab_and_beyond_store_v3');
      localStorage.removeItem('arab_and_beyond_store_v4');
      localStorage.removeItem('arab_and_beyond_store_v5');
      localStorage.removeItem('arab_and_beyond_store_v6');

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        // Prevent stale cache containing Bali, pine forest, or Dubai night image
        if (!saved.includes('photo-1544644181-1484b3fdfc62') && !saved.includes('photo-1509316975850-ff9c5deb0cd9') && !saved.includes('photo-1512100356356-de1b84283e18') && !saved.includes('photo-1518684079-3c830dcef090')) {
          const parsed = JSON.parse(saved);
          if (parsed.destinations) setDestinations(parsed.destinations);
          if (parsed.packages) setPackages(parsed.packages);
          if (parsed.hotels) setHotels(parsed.hotels);
          if (parsed.enquiries) setEnquiries(parsed.enquiries);
          if (parsed.orders) setOrders(parsed.orders);
          if (parsed.settings) setSettings(parsed.settings);
          if (parsed.savedPackageIds) setSavedPackageIds(parsed.savedPackageIds);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {
      // ignore parsing error
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          destinations,
          packages,
          hotels,
          enquiries,
          orders,
          settings,
          savedPackageIds
        })
      );
    } catch {
      // ignore write error
    }
  }, [destinations, packages, hotels, enquiries, orders, settings, savedPackageIds, isHydrated]);

  const toggleSavePackage = (packageId: string) => {
    setSavedPackageIds(prev =>
      prev.includes(packageId) ? prev.filter(id => id !== packageId) : [...prev, packageId]
    );
  };

  const isPackageSaved = (packageId: string) => savedPackageIds.includes(packageId);

  const addEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'referenceId' | 'createdAt' | 'status'>): Enquiry => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      referenceId: `AB-ENQ-2026-${randomSuffix}`,
      createdAt: new Date().toISOString(),
      status: 'New',
      priority: enquiryData.priority || 'Medium',
      internalNotes: []
    };
    setEnquiries(prev => [newEnquiry, ...prev]);
    return newEnquiry;
  };

  const updateEnquiryStatus = (enquiryId: string, status: EnquiryStatus, note?: string) => {
    setEnquiries(prev =>
      prev.map(enq => {
        if (enq.id !== enquiryId) return enq;
        const updatedNotes = enq.internalNotes ? [...enq.internalNotes] : [];
        if (note) {
          updatedNotes.push({
            id: `note-${Date.now()}`,
            author: activeRole,
            timestamp: new Date().toISOString(),
            content: note
          });
        }
        return {
          ...enq,
          status,
          internalNotes: updatedNotes
        };
      })
    );
  };

  const assignEnquiryAgent = (enquiryId: string, agent: string) => {
    setEnquiries(prev =>
      prev.map(enq => (enq.id === enquiryId ? { ...enq, assignedAgent: agent } : enq))
    );
  };

  const addBookingOrder = (orderData: Omit<BookingOrder, 'id' | 'orderReference' | 'createdAt'>): BookingOrder => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: BookingOrder = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderReference: `AB-RES-2026-${randomSuffix}`,
      createdAt: new Date().toISOString()
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, orderStatus: OrderStatus, notes?: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;
        return {
          ...ord,
          orderStatus,
          auditTrail: [
            ...ord.auditTrail,
            {
              timestamp: new Date().toISOString(),
              action: `Order Status updated to: ${orderStatus}`,
              performedBy: activeRole,
              notes
            }
          ]
        };
      })
    );
  };

  const updatePaymentStatus = (orderId: string, paymentStatus: PaymentStatus, notes?: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;
        return {
          ...ord,
          paymentStatus,
          auditTrail: [
            ...ord.auditTrail,
            {
              timestamp: new Date().toISOString(),
              action: `Payment Status updated to: ${paymentStatus}`,
              performedBy: activeRole,
              notes
            }
          ]
        };
      })
    );
  };

  const addPackage = (newPackage: Package) => {
    setPackages(prev => [newPackage, ...prev]);
  };

  const updatePackage = (packageId: string, updated: Partial<Package>) => {
    setPackages(prev => prev.map(pkg => (pkg.id === packageId ? { ...pkg, ...updated } : pkg)));
  };

  const deletePackage = (packageId: string) => {
    setPackages(prev => prev.filter(pkg => pkg.id !== packageId));
  };

  const addHotel = (newHotel: Hotel) => {
    setHotels(prev => [newHotel, ...prev]);
  };

  const updateHotel = (hotelId: string, updated: Partial<Hotel>) => {
    setHotels(prev => prev.map(h => (h.id === hotelId ? { ...h, ...updated } : h)));
  };

  const updateDestination = (destinationId: string, updated: Partial<Destination>) => {
    setDestinations(prev => prev.map(d => (d.id === destinationId ? { ...d, ...updated } : d)));
  };

  const updateSettings = (updated: Partial<WebsiteSettings>) => {
    setSettings(prev => ({ ...prev, ...updated }));
  };

  return (
    <TravelStoreContext.Provider
      value={{
        destinations,
        packages,
        hotels,
        enquiries,
        orders,
        settings,
        currency,
        setCurrency,
        savedPackageIds,
        toggleSavePackage,
        isPackageSaved,
        addEnquiry,
        updateEnquiryStatus,
        assignEnquiryAgent,
        addBookingOrder,
        updateOrderStatus,
        updatePaymentStatus,
        addPackage,
        updatePackage,
        deletePackage,
        addHotel,
        updateHotel,
        updateDestination,
        updateSettings,
        activeRole,
        setActiveRole
      }}
    >
      {children}
    </TravelStoreContext.Provider>
  );
}

export function useTravelStore() {
  const context = useContext(TravelStoreContext);
  if (!context) {
    throw new Error('useTravelStore must be used within a TravelStoreProvider');
  }
  return context;
}

